import { IProduct } from '@/types/product-type';
import { Component,Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-sm-item',
  templateUrl: './product-sm-item.component.html',
  styleUrls: ['./product-sm-item.component.scss']
})
export class ProductSmItemComponent {
  @Input() product!: IProduct;
  
}
