import { CartService } from '@/shared/services/cart.service';
import { CompareService } from '@/shared/services/compare.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent {

  constructor(public compareService:CompareService,public cartService:CartService){}
}
