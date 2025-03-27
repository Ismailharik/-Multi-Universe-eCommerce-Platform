import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
import { ProductBanner } from '@/data/banner-data';
import { IProductBanner } from '@/types/banner-d-type';

@Component({
  selector: 'app-electronic-product-banner',
  templateUrl: './electronic-product-banner.component.html',
  styleUrls: ['./electronic-product-banner.component.scss'],
})
export class ElectronicProductBannerComponent {

  // banner slider data
  public productBannerData: IProductBanner[] = ProductBanner;

  ngOnInit(): void {
    new Swiper('.tp-product-banner-slider-active', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      effect: 'fade',
      modules: [Pagination, EffectFade],
      pagination: {
        el: '.tp-product-banner-slider-dot',
        clickable: true,
      },
    });
  }
}
