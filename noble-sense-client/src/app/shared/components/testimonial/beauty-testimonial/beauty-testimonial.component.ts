import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-beauty-testimonial',
  templateUrl: './beauty-testimonial.component.html',
  styleUrls: ['./beauty-testimonial.component.scss']
})
export class BeautyTestimonialComponent {
  // testimonial data
  public testi_data = [
    {
      id: 1,
      review: 4,
      desc: "Suscipit tellus mauris a diam maecenas. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor urna nunc id cursus. Scelerisque purus semper eget duis at. Pharetra vel turpis nunc eget.",
      user: "/assets/img/users/user-1.jpg",
      name: "Jake Weary",
      designation: "CO Founder",
    },
    {
      id: 2,
      review: 3.5,
      desc: "Suscipit tellus mauris a diam maecenas. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor urna nunc id cursus. Scelerisque purus semper eget duis at. Pharetra vel turpis nunc eget.",
      user: "/assets/img/users/user-1.jpg",
      name: "Salim Rana",
      designation: "Web Developer",
    },
    {
      id: 3,
      review: 5,
      desc: "Suscipit tellus mauris a diam maecenas. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor urna nunc id cursus. Scelerisque purus semper eget duis at. Pharetra vel turpis nunc eget.",
      user: "/assets/img/users/user-1.jpg",
      name: "Selina Gomz",
      designation: "CO Founder",
    },
  ]
  // swiper setting
  ngOnInit(): void {
    new Swiper('.tp-testimoinal-slider-active-3', {
      slidesPerView: 2,
      spaceBetween: 24,
      pagination: {
        el: ".tp-testimoinal-slider-dot-3",
        clickable: true
      },
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".tp-testimoinal-slider-button-next-3",
        prevEl: ".tp-testimoinal-slider-button-prev-3",
      },
      breakpoints: {
        '1200': {
          slidesPerView: 2,
        },
        '992': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 1,
        },
        '576': {
          slidesPerView: 1,
        },
        '0': {
          slidesPerView: 1,
        },
      }
    });
  }
}
