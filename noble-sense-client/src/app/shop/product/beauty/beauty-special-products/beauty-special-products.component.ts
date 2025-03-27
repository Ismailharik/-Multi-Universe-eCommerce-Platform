import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination,EffectFade } from 'swiper/modules';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-beauty-special-products',
  templateUrl: './beauty-special-products.component.html',
  styleUrls: ['./beauty-special-products.component.scss']
})
export class BeautySpecialProductsComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;

  public products: IProduct[] = [
   
  ];


  constructor(public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.products = products.filter((p) => p.parent === "wooden-houses").slice(-4);
    });
  }

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper('.tp-special-slider-active', {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        modules: [Navigation, Pagination,EffectFade],
        pagination: {
          el: ".tp-special-slider-dot",
          clickable: true
        }
      });
    }
  }

}
