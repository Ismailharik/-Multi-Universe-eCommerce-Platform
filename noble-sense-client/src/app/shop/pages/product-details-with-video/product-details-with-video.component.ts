import { Component } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-product-details-with-video',
  templateUrl: './product-details-with-video.component.html',
  styleUrls: ['./product-details-with-video.component.scss']
})
export class ProductDetailsWithVideoComponent {
  public product!: IProduct;

  constructor(public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.product = products.find(p => p.videoId)!;
    });
  }

}
