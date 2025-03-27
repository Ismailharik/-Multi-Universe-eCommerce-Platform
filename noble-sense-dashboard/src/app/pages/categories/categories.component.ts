import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from 'src/app/models/category.model';
import { CategoryPage } from 'src/app/models/categoryPage.model';
import { CategoryService } from './services/category.service';
import { CategoryDialogContentComponent } from './category-dialog-content/category-dialog-content.component';
import { AddCategoryComponent } from './add/add.component';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements  OnInit {
  destroyRef = inject(DestroyRef)


  fullScreenImagePath!: string
  showFullScreen: boolean = false

  searchText: any;
  displayedColumns: string[] = [
   
    'name',
    'description',
    'numberOfProducts',
    'parent',
    'action'
  ];
  categoryPage: CategoryPage = {  
    first: false,
    last: false,
    page: 0,
    size: 5,
    totalPages: 0,
    categories: []
  }
  dataSource = new MatTableDataSource<ICategory>([]);
  // snak bar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialog: MatDialog,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.findAllCategories()
  }
  findAllCategories() {
    this.categoryService.getAllCategories(this.categoryPage.page, this.categoryPage.size)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.categoryPage = resp;
          this.dataSource.data = this.categoryPage.categories;
        },
        error: (error) => {
      this.openSnackBar('categories n\'a pas pu etre recuperer', 'X')
        }
      });
  }


  searchByName(keyword: string): void {
    console.log(keyword);
  }


  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(CategoryDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addCategory(result.data);
      } else if (result.event === 'Update') {
        this.updateCategory(result.data);
      } else if (result.event === 'Delete') {
        this.deleteCategory(result.data);
      }
    });
  }

  addCategory(category: ICategory): void {

    this.categoryService.addCategory(category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.findAllCategories()
          this.openSnackBar('categorie est ajoute avec succes', 'X')
        }, error: (error) => {
          this.openSnackBar(error.error.message, 'X')
          console.error(error.message);
        }
      })
    this.dialog.open(AddCategoryComponent);
  }

  // tslint:disable-next-line - Disables all
  updateCategory(category: ICategory): boolean | any {
    this.categoryService.updateCategory(category.id, category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          {
            this.openSnackBar('categorie est modifier avec succes', 'X')
            this.findAllCategories()
          }
        }, error: (error) => {
          this.openSnackBar(error.message, 'X')
          console.error(error);
        }
      })
  }

  // tslint:disable-next-line - Disables all
  deleteCategory(user: ICategory): boolean | any {
    this.categoryService.deleteCategory(user.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.openSnackBar('catégorie supprimé avec succes', 'X')
          this.findAllCategories()
        },
        error: err => {
          this.openDialog(err.message, 'X')
          console.error("category deleted successfully")
        }
      })
  }
  confirmDeleteImage(category: ICategory, url: string): void {
    this.categoryService.deleteImage(category.id, url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.openSnackBar('image supprimé avec succes', 'X')
          this.findAllCategories()
        },
        error: err => console.log(err)
      })
  }

  onPageChange(event: any): void {
    console.log('event', event)
    this.categoryPage.page = event?.pageIndex ?? 0;
    this.categoryPage.size = event?.pageSize ?? 10;
    this.findAllCategories();
  }




  // Function to expand the image to full screen
  expandImage(event: any, src: string) {
    this.fullScreenImagePath = src;
    this.showFullScreen = true;
  }
  // Function to close the full-screen image
  closeImage() {
    this.showFullScreen = false;
    this.fullScreenImagePath = '';
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }
}


