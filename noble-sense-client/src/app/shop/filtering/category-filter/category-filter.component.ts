import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import category_data from '@/data/category-data';
import { ICategory } from '@/types/category-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from '@/shared/services/category.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  private  parent="produits-alimentaires"

  public categories!: ICategory[]
  activeQuery: number=0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['categoryId'];
      this.parent = queryParams['parent'];
      console.log('parent ',this.parent)
    });
    this.getCategoriesByParent()
  }

  handleCategoryRoute(categoryId: number): void {

    // Define the query parameters as an object
    const queryParams: Params = {
      categoryId: categoryId,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Anchore Link
      });
  }
  getCategoriesByParent(){
    this.categoryService.getCategoriesByParent(this.parent).subscribe({
      next:resp=>{
        this.categories=resp
      }
    })
  }
}
