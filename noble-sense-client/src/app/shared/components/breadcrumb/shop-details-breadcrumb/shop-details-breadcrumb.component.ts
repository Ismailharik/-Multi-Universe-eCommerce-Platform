import { IProduct } from '@/types/product-type';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-shop-details-breadcrumb',
  templateUrl: './shop-details-breadcrumb.component.html',
  styleUrls: ['./shop-details-breadcrumb.component.scss']
})
export class ShopDetailsBreadcrumbComponent {
  @Input () product!:IProduct
}
