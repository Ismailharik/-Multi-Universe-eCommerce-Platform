import { UtilsService } from '@/shared/services/utils.service';
import { Component, Input } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details-thumb',
  templateUrl: './product-details-thumb.component.html',
  styleUrls: ['./product-details-thumb.component.scss'],
})
export class ProductDetailsThumbComponent {
  @Input() product!: IProduct;

  constructor(
    public productService: ProductService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    if (this.product) {
      this.productService.activeImg = this.product.imageURLs[0];
    }
  }
}
