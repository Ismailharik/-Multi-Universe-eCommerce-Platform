import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryService } from '@/shared/services/category.service';
import { ICategory } from '@/types/category-type';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-electronic-category',
  templateUrl: './electronic-category.component.html',
  styleUrls: ['./electronic-category.component.scss'],
})
export class ElectronicCategoryComponent implements OnInit {

  // constant
  private category_parent = 'produits-alimentaires';
  category_items!:ICategory[]
  categories!: ICategory[];

  

  constructor(
    private categoryService: CategoryService,
    private destroyRef:DestroyRef 
    ) {}

  ngOnInit(): void {
   this.getAllCategories()
  }

  getAllCategories() {
    return this.categoryService
    .getCategoriesByParent(this.category_parent)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        this.category_items = res;
      },
      error: (err) => console.log(err),
    });
  }
}
