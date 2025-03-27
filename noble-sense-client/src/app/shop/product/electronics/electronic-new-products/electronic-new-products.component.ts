import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-electronic-new-products',
  templateUrl: './electronic-new-products.component.html',
  styleUrls: ['./electronic-new-products.component.scss']
})
export class ElectronicNewProductsComponent {
  // electronic prd
  public electronic_prd:IProduct[] = [];
  public new_arrival_product:IProduct[] = [];

  constructor(public productService: ProductService) {
    this.productService.products.subscribe((products) => {
      this.electronic_prd = products.filter((p) => p.productType === 'electronics');
      this.new_arrival_product = products.filter((p) => p.productType === 'electronics').slice(-5);
    });
  }

  ngOnInit(): void {
    new Swiper('.tp-product-arrival-active', {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: false,
      modules: [Navigation, Pagination],
      pagination: {
        el: ".tp-arrival-slider-dot",
        clickable: true
      },
      navigation: {
        nextEl: ".tp-arrival-slider-button-next",
        prevEl: ".tp-arrival-slider-button-prev",
      },
      breakpoints: {
        '1200': {
          slidesPerView: 4,
        },
        '992': {
          slidesPerView: 3,
        },
        '768': {
          slidesPerView: 2,
        },
        '576': {
          slidesPerView: 2,
        },
        '0': {
          slidesPerView: 1,
        }
      }
    });
  }
}
