import { UtilsService } from '@/shared/services/utils.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {

  constructor(public utilsService:UtilsService){

  }
}
