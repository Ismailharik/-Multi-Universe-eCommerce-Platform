import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-electronic-sm-products',
  templateUrl: './electronic-sm-products.component.html',
  styleUrls: ['./electronic-sm-products.component.scss']
})
export class ElectronicSmProductsComponent implements OnInit {
  private readonly parent="produits-alimentaires";
  // electronic prd
  public electronic_prd:IProduct[] = [];

  // discount_products
  public discount_products:IProduct[] = [];
  // featured_products
  public featured_products:IProduct[] = [];
  // featured_products
  public selling_products:IProduct[] = [];

  constructor(
    public productService: ProductService,
    private destroyRef:DestroyRef
    ) {}

  ngOnInit(): void {
    this.getTop3DiscountProducts();
    this.getTop3FeaturedProducts();
    this.getTop3SellingProducts();
  }

    getTop3DiscountProducts(){
      this.productService.getTop3DiscountedProducts(this.parent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log("discounted products",res);
          this.discount_products = res
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    getTop3FeaturedProducts() {
 this.productService.getTop3FeaturedProducts(this.parent)
     .pipe(takeUntilDestroyed(this.destroyRef))
     .subscribe({
       next: (res) => {
         console.log("featured products",res);
         this.featured_products = res
       },
       error: (err) => {
         console.log(err);
       }
     })
    }
    getTop3SellingProducts() {
      this.productService.getTop3BestSellingProducts(this.parent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log("selling products",res);
          this.selling_products = res
        },
        error: (err) => {
          console.log(err);
        }
      })
    }


}
