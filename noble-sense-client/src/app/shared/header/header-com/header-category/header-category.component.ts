import { Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
import category_data from '@/data/category-data';
import { CategoryService } from '@/shared/services/category.service';
import { ProductService } from '@/shared/services/product.service';
import { ICategory } from '@/types/category-type';
import { ProductPage } from '@/types/product-type';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.scss'],
})
export class HeaderCategoryComponent implements OnInit {

  categories!: ICategory[];
  productsPage!:ProductPage
  public isActive: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService
      .getCategoriesByParent('produits-alimentaires')
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (err) => {
          console.error(err.message);
        },
      });
  }
  public handleActive(): void {
    this.isActive = !this.isActive;
  }
  getProductsByCategory(category: number) {
    this.productService.getProductsByCategory(category).subscribe({
      next: (res) => {
        console.log(res)
        this.productsPage = res
      },error: (err) => {
        console.error(err.message);
      },
    });
  }
}
