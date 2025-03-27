import { Component } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details-gallery',
  templateUrl: './product-details-gallery.component.html',
  styleUrls: ['./product-details-gallery.component.scss']
})
export class ProductDetailsGalleryComponent {
  public product!: IProduct;

  constructor(public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.product = products[8];
    });
  }
}
