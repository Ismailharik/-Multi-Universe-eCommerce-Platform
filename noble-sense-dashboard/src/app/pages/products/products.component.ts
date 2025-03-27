import { Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/models/product.model';
import { ProductPage } from 'src/app/models/productPage.model';
import { ProductService } from './services/product.service';
import { ProductDialogContentComponent } from './product-dialog-content/product-dialog-content.component';
import { AddProductComponent } from './add/add.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CategoryService } from '../categories/services/category.service';
import { CategoryPage } from 'src/app/models/categoryPage.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  destroyRef = inject(DestroyRef)

  fullScreenImagePath!: string
  showFullScreen: boolean = false
  selectedCategoryId=1;



  // snak bar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  searchText: any;
  displayedColumns: string[] = ['image','title', 'offerDate', 'price', 'discount', 'quantity','action'];
  
  productsPage: ProductPage = {// initialise the customerPage if you want to modify the default page & size
    first: false,
    last: false,
    page: 0,
    size: 5,
    totalPages: 0,
    products: []
  }
  dataSource = new MatTableDataSource<IProduct>([]);
  imageBasePath = environment.host + "/api/v1/images"
  categoryPage!: CategoryPage
  @ViewChild('fileInput') fileInput!: ElementRef 


  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.findProductsByCategory()
    this.findAllCategories()
  }



  // searchByName(keyword: string): void {
  //   console.log(keyword);

  //   this.productService.findByName(keyword, this.customersPage.page, this.customersPage.size).subscribe({
  //     next: resp => {
  //       this.customersPage = resp;
  //       this.dataSource.data = this.customersPage.users;
  //       console.log(this.customersPage)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching customers:', error);
  //     }
  //   })
  // }


  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ProductDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addProduct(result.data);
      } else if (result.event === 'Update') {
        this.updateProduct(result.data);
      } else if (result.event === 'Delete') {
        this.deleteProduct(result.data);
      }
    });
  }

  // tslint:disable-next-line - Disables all
  addProduct(product: IProduct): void {
    const productCopy:any = { ...product }; 
    productCopy.additionalInformation = JSON.stringify(product.additionalInformation);
    productCopy.sizes = JSON.stringify(product.sizes);
    console.log("product", productCopy)
    this.productService.addProdcut(productCopy, productCopy.categoryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.dialog.open(AddProductComponent);
          this.findProductsByCategory()
        }, error: (error) => {
          console.error(error.message);
        }
      })
  }

  // tslint:disable-next-line - Disables all
  updateProduct(product: IProduct): boolean | any {
    const productCopy:any = { ...product }; 
    productCopy.additionalInformation = JSON.stringify(product.additionalInformation);
    productCopy.sizes = JSON.stringify(product.sizes);
    
    console.log("product --> ", productCopy)
    this.productService.updateProduct(product.id, productCopy)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          {
            this.findProductsByCategory()
          }
        }, error: (error) => {
          console.error(error.message);
        }
      })

  }

  // tslint:disable-next-line - Disables all
  deleteProduct(productId:number): boolean | any {
    console.log("delete product", productId)
    this.productService.deleteProduct(productId).subscribe({
      next: resp => {
        this.findProductsByCategory()
      },
      error: err => console.error("product deleted successfully")
    })
  }
  confirmDeleteImage(product: IProduct, url: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');

    if (confirmDelete) {
      // Perform deletion logic here
      // Assuming 'element' is the object containing the image paths
      // Remove the image path at the specified index
      this.productService.deleteImage(product.id, url).subscribe({
        next: resp => {
          this.findProductsByCategory()
        },
        error: err => console.log(err)
      })

      // Call a service method to delete the image from the server if needed
      // For example: this.imageService.deleteImage(element.src[index]).subscribe();
    }
  }
  
  onPageChange(event: any): void {
    this.productsPage.page = event.pageIndex;
    this.productsPage.size = event.pageSize;
   this.findProductsByCategory()
  }

  // Function to expand the image to full screen
  expandImage(event: any, src: string) {
    this.fullScreenImagePath = this.imageBasePath + '/' + src;
    this.showFullScreen = true;
  }

  // Function to close the full-screen image
  closeImage() {
    this.showFullScreen = false;
    this.fullScreenImagePath = '';
  }

  // for the select box
  findAllCategories() {
    this.categoryService.getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => this.categoryPage = resp,
        error: err => console.log(err)
      })
  }
  onCategorySelectionChange() {
    this.productsPage.page = 0;
    this.productsPage.size = 5;
    this.findProductsByCategory()
  }

  findProductsByCategory() {
    this.productService.findProductsByCategory(
      this.selectedCategoryId,
      this.productsPage.page,
      this.productsPage.size
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.productsPage = resp
          this.parseJsonData()
          this.dataSource.data = this.productsPage.products
        },
        error: err => console.log(err)

      })
  }
  parseJsonData(): void {
    if (this.productsPage && this.productsPage.products) {

      this.productsPage.products.forEach(product => {
        if (product.additionalInformation) {
          try {
            product.additionalInformation = JSON.parse(product.additionalInformation);
            
          } catch (error) {
            console.error('Error parsing additionalInformation:', error);
            product.additionalInformation = {}; 
          }
        }
        if (product.sizes) {
          try {
            product.sizes = JSON.parse(product.sizes);
          } catch (error) {
            console.error('Error parsing sizes:', error);
            product.sizes = {}; 
          }
        }
        // Parse any other properties as needed
      });
    }
  }

  // this variable will catch the product that will add the image
  currentProductId = 0;
  triggerFileInput(id:number) {
    this.currentProductId = id
    this.fileInput.nativeElement.click();
  }
  
  addImageToProduct(event: any) {
    const file = event.target.files[0];
    if (!file) {
      // Handle no file selected
      return;
    }
    const mimeType = file.type;
    if (!mimeType.match(/image\/*/)) {
      // Handle wrong file type
      return;
    }
    this.productService.addImageToProduct(this.currentProductId, file).subscribe(
      {
        next: updatedProduct => {
          this.findProductsByCategory();
        },
        error: error => {
          console.log(error);
        }
      }
    )
  }

    // Expanded array
    expandedElement: IProduct | null = null;



}


