import { Component } from '@angular/core';
import category_data from "@/data/category-data";
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-category',
  templateUrl: './fashion-category.component.html',
  styleUrls: ['./fashion-category.component.scss']
})
export class FashionCategoryComponent {
  categoryItems = category_data.filter((c) => c.productType === "fashion");

  constructor(private router: Router) {}

  handleParentCategory(value: string) {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/shop'], { queryParams: { category: newCategory } });
  }
}
