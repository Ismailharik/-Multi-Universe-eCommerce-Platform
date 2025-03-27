import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@/shared/services/utils.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent {
  public searchText: string = '';
  public productType: string = '';
  constructor (public utilsService:UtilsService,private router: Router){};

  public categories: string[] = ["electronics", "fashion", "beauty", "jewelry"];

  handleProductType(productType: string) {
    this.productType = productType;
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if(!this.searchText && !this.productType){
      return
    }
    else {
      if (this.searchText) {
        queryParams['searchText'] = this.searchText;
      }
      if (this.productType) {
        queryParams['productType'] = this.productType;
      }
      this.router.navigate(['/pages/search'], { queryParams });
    }
  }
}
