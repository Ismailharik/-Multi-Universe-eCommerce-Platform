import { Component } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-electronic-gadget-products',
  templateUrl: './electronic-gadget-products.component.html',
  styleUrls: ['./electronic-gadget-products.component.scss']
})
export class ElectronicGadgetProductsComponent {
  // electronic prd
  public electronic_prd:IProduct[] = [];
  // product gadget items
  public product_gadget:IProduct[] = [];

  constructor(public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.electronic_prd = products.filter((p) => p.productType === 'electronics');
      this.product_gadget = products.filter((p) => p.productType === 'electronics').slice(0,6);
    });
  }
}
