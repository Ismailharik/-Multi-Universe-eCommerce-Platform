import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-shop-area',
  templateUrl: './shop-area.component.html',
  styleUrls: ['./shop-area.component.scss']
})
export class ShopAreaComponent {
  @Input() listStyle: boolean = false;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() shop_right_side: boolean = false;
  @Input() shop_no_side: boolean = false;

  public products: IProduct[] = [];
  public minPrice: number = 0;
  public maxPrice: number = this.productService.maxPrice;
  public niceSelectOptions = this.productService.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public categoryId:  number=0

  public subcategory: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 0;
  public pageSize: number = 9;
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
    public productService: ProductService,
    private viewScroller: ViewportScroller
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      // console.log('params', params);
      this.minPrice = params['minPrice'] ? params['minPrice'] : this.minPrice;
      this.maxPrice = params['maxPrice'] ? params['maxPrice'] : this.maxPrice;
      this.brand = params['brand']
        ? params['brand'].toLowerCase().split(' ').join('-') : null;

        this.categoryId= params['categoryId']? params['categoryId']: 0;

      this.subcategory = params['subcategory']
        ? params['subcategory'].toLowerCase().split(' ').join('-') : null;
      this.status = params['status']
        ? params['status'].toLowerCase().split(' ').join('-') : null;
      this.pageNo = params['page'] ? params['page'] : this.pageNo;
      this.sortBy = params['sortBy'] ? params['sortBy'] :this.sortBy;

      this.filterPeroducts()

      // Get Filtered Products..
      // this.productService.filterProducts().subscribe((response) => {
      //   // Sorting Filter
      //   this.products = this.productService.sortProducts(response, this.sortBy);
      //   // Category Filter
      //   if (this.category){
      //     this.products = this.products.filter(
      //       (p) => p.parent.toLowerCase().split(' ').join('-') === this.category
      //     );
      //   }
      //   if (this.subcategory){
      //     this.products = this.products.filter(
      //       (p) => p.parent.toLowerCase().replace("&", "").split(" ").join("-") ===
      //         this.subcategory
      //     );
      //   }
      //   // status Filter
      //   if (this.status) {
      //     if (this.status === 'on-sale') {
      //       this.products = this.products.filter((p) => p.discount > 0);
      //     } else if (this.status === 'in-stock') {
      //       this.products = this.products.filter((p) => p.status === 'in-stock');
      //     }
      //     else if (this.status === 'out-of-stock') {
      //       this.products = this.products.filter((p) => p.status === 'out-of-stock' || p.quantity === 0);
      //     }
      //   }
      //   // brand filtering
      //   if (this.brand) {
      //     this.products = this.products.filter((p) => p.brand.toLowerCase() === this.brand);
      //   }

      //   // Price Filter
      //   this.products = this.products.filter(
      //     (p) => p.price >= Number(this.minPrice) && p.price <= Number(this.maxPrice)
      //   );
      //   // Paginate Products
      //   this.paginate = this.productService.getPager(this.products.length,Number(+this.pageNo),this.pageSize);
      //   this.products = this.products.slice(this.paginate.startIndex,this.paginate.endIndex + 1);
      // });
      
    });
  }
  filterPeroducts(){
    console.log(this.categoryId,this.status, this.minPrice, this.maxPrice, this.pageNo, this.sortBy)
    this.productService.filterProducts(this.categoryId,this.status, this.minPrice, this.maxPrice, this.pageNo, this.sortBy)
    .subscribe({
      next: resp=>{
        // Paginate Products
        this.products=resp.products
        console.log("resp",this.products)
      this.paginate = this.productService.getPager(this.products.length,Number(+this.pageNo))
      this.products = this.products.slice(this.paginate.startIndex,this.paginate.endIndex + 1)
      }
  });
  }


  ngOnInit() {
    this.activeTab = this.listStyle ? 'list' : 'grid';
  }

  // Append filter value to Url
  updateFilter(tags: any) {
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
    this.pageNo = 0;
    this.router.navigate(['shop']);
    console.log("reset filter")
    this.filterPeroducts()
  }
}
