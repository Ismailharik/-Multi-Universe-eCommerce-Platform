import { Component, Input } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
})
export class ProductDetailsWrapperComponent {
  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;

  textMore = false;

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  handleIsColorVariant(product: IProduct) {
    // if (product.imageURLs.some((item) => item?.color && item?.color?.name)) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  ngOnInit() {}
}
