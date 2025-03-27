import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

@Component({
  selector: 'app-hero-banner-three',
  templateUrl: './hero-banner-three.component.html',
  styleUrls: ['./hero-banner-three.component.scss']
})
export class HeroBannerThreeComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;

  // slider data
  public slider_data = [
    {
      id: 1,
      bg: "/assets/img/slider/avenir-prestige/1.jpg",
      subtitle: "Modern Villa with Pool",
      title: "A stylish villa with a deck and pool.",
    },
    {
      id: 2,
      bg: "/assets/img/slider/avenir-prestige/2.jpg",
      subtitle: "Compact Two-Story Home",
      title: "Minimalist design with dark accents.",
    },
    {
      id: 3,
      bg: "/assets/img/slider/avenir-prestige/3.jpg",
      subtitle: "Elegant Two-Story Residence",
      title: "White and gray exterior.",
    },
    
  ]

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance =  new Swiper('.tp-slider-active-3', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: 'fade',
        modules: [Pagination, EffectFade],
        pagination: {
          el: ".tp-slider-3-dot",
          clickable: true
        }
      });
    }
  }
}
