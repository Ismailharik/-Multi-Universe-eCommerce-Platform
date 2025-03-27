import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  @Input() listStyle: boolean = false;

  public products: IProduct[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 2000;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public categoryId:  number=0
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 0;
  public paginate: any = {}; // Pagination use only
  public sortBy: string = 'price'; // Sorting Order
  public mobileSidebar: boolean = false;


  activeTab: string = this.listStyle ? 'list' : 'grid';
  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // shop changeFilterSelect
  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value)
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
      this.minPrice = params['minPrice'] ? params['minPrice'] : this.minPrice;
      this.maxPrice = params['maxPrice'] ? params['maxPrice'] : this.maxPrice;
      this.brand = params['brand']  
        ? params['brand'].toLowerCase().split(' ').join('-') : null;

      this.categoryId= params['categoryId']? params['categoryId']: 0;
      this.status = params['status']
        ? params['status'].toLowerCase().split(' ').join('-') : null;
      this.pageNo = params['page'] ? params['page'] : this.pageNo;
      this.sortBy = params['sortBy'] ? params['sortBy'] :this.sortBy;


      this.filterPeroducts()
    })
}
  filterPeroducts(){
    this.productService.filterProducts(this.categoryId,this.status, this.minPrice, this.maxPrice, this.pageNo, this.sortBy)
    .subscribe({
      next: resp=>{
        // Paginate Products
        this.products=resp.products
      this.paginate = this.productService.getPager(this.products.length,Number(+this.pageNo))
      this.products = this.products.slice(this.paginate.startIndex,this.paginate.endIndex + 1)
      }
  });
  }
  ngOnInit() {
    // console.log('pagination',this.paginate)
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    console.log('tags', tags);
    tags.page = null; // Reset Pagination
  }

  // SortBy Filter
  sortByFilter(value:string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  handleResetFilter () {
    this.minPrice = 0;
    this.maxPrice = this.productService.maxPrice;
    this.router.navigate(['shop']);
  }
}
