import { Component, DestroyRef, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-electronic-offer-products',
  templateUrl: './electronic-offer-products.component.html',
  styleUrls: ['./electronic-offer-products.component.scss'],
})
export class ElectronicOfferProductsComponent implements OnInit {
  // product offer
  offer_products!: IProduct[] ;
  private readonly parent = 'produits-alimentaires';

  constructor(
    public productService: ProductService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getLimitedOfferProducts();
    this.swipper();
  }

  getLimitedOfferProducts() {
    this.productService
      .getLimitedOfferProducts(this.parent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log("offer products",res);
          this.offer_products = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  swipper() {
    new Swiper('.tp-product-offer-slider-active', {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: false,
      modules: [Pagination],
      pagination: {
        el: '.tp-deals-slider-dot',
        clickable: true,
      },
      breakpoints: {
        '1200': {
          slidesPerView: 3,
        },
        '992': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 2,
        },
        '576': {
          slidesPerView: 1,
        },
        '0': {
          slidesPerView: 1,
        },
      },
    });
  }
}
