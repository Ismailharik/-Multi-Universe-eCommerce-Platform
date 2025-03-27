import { CartService } from '@/shared/services/cart.service';
import { UtilsService } from '@/shared/services/utils.service';
import { WishlistService } from '@/shared/services/wishlist.service';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss']
})
export class HeaderStickyComponent {
  public searchText: string = '';
  public productType: string = '';

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public utilsService: UtilsService,
    private router: Router
  ) { }

  // select options for header category
  public niceSelectOptions = [
    { value: 'select-category', text: 'Select Category' },
    { value: 'electronics', text: 'Electronics' },
    { value: 'fashion', text: 'Fashion' },
    { value: 'beauty', text: 'Beauty' },
    { value: 'jewelry', text: 'Jewelry' },
  ];

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
    this.productType = selectedOption.value;
  }

  headerSticky: boolean = false;

  // sticky nav
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
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
