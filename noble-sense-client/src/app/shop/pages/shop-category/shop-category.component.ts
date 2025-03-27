import { Router } from '@angular/router';
import { ICategory } from '@/types/category-type';
import { Component } from '@angular/core';
import category_data from '@/data/category-data';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss'],
})
export class ShopCategoryComponent {
  public category_data: ICategory[] = category_data;
  constructor(private router: Router) {}
  handleCategory(parent: string) {
    const category = parent.toLowerCase().split(' ').join('-');
    this.router.navigate(['/shop'], {
      queryParams: { category: category },
    });
  }
}
