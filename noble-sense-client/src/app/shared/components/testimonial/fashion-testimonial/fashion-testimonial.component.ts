import { Component, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { fashion_testi_data } from '@/data/testimonial-data';
import { IFashionTestimonial } from '@/types/testimonial-d-type';

@Component({
  selector: 'app-fashion-testimonial',
  templateUrl: './fashion-testimonial.component.html',
  styleUrls: ['./fashion-testimonial.component.scss'],
})
export class FashionTestimonialComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;

  public testimonial_items: IFashionTestimonial[] = fashion_testi_data;


  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper('.tp-testimonial-slider-active', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        modules: [Pagination],
        pagination: {
          el: '.tp-testimonial-slider-dot',
          clickable: true,
        },
      });
    }
  }

  ngOnInit(): void {

  }
}
