import { Component, ChangeDetectorRef, OnInit, DestroyRef } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-electronic-trending-products',
  templateUrl: './electronic-trending-products.component.html',
  styleUrls: ['./electronic-trending-products.component.scss']
})
export class ElectronicTrendingProductsComponent implements OnInit {
  private readonly  parent="produits-alimentaires"

  // electronic prd
  public electronic_prd:IProduct[] = [];
  
  // image
  
  constructor(private cdr: ChangeDetectorRef,
    public productService: ProductService,
    private destroyRef:DestroyRef
    ) {
    }
    ngOnInit(): void {
      this.getTrandingProducts()
    }
    // tab
    public activeTab = 'new';
    public tabs = ['new', 'featured',
    //  'Top Sellers'
    ];
  // handleActiveTab
  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    this.getTrandingProducts()
    // this.filteredProducts = this.getTrandingProducts(); // Update the filtered products
    this.cdr.detectChanges(); // Trigger change detection
  }
  // filtered Products
  // filteredProducts = this.getTrandingProducts(); // Initialize with default filtering
  // get Filtered Products
  getFilteredProducts(): IProduct[] {
    if (this.activeTab === 'new') {
      return this.electronic_prd.slice(0, 8);
    } else if (this.activeTab === 'featured') {
      return this.electronic_prd.filter((product) => product.featured);
    } else if (this.activeTab === 'Top Sellers') {
      return this.electronic_prd
        .slice()
        .sort((a, b) => (b.sellCount ?? 0) - (a.sellCount ?? 0))
        .slice(0, 8);
    } else {
      return [];
    }
  }

  getTrandingProducts(){
    this.productService.getTrandingProducts(this.activeTab,this.parent)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        this.electronic_prd = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getFeaturedProducts(){
    this.productService.getTrandingProducts(this.activeTab,this.parent)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        this.electronic_prd = res
        console.log("featured products",this.electronic_prd);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
