import { Component } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.scss']
})
export class ProductDetailsListComponent {
  public product!: IProduct;
  //image

  constructor(public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.product = products[5];
    });
  }
}
