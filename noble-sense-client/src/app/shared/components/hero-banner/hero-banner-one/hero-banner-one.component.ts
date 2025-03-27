import { HeroBannerService } from '@/shared/services/hero-banner.service';
import { IHomeSlider } from '@/types/homeSlider-type';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';

@Component({
  selector: 'app-hero-banner-one',
  templateUrl: './hero-banner-one.component.html',
  styleUrls: ['./hero-banner-one.component.scss']
})
export class HeroBannerOneComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public swiperIndex: number = 0;

  homeSliderData!: IHomeSlider[];

  constructor(
    private heroBannerService: HeroBannerService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.getHomeSlider();
  }

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.initializeSwiper();
    }
  }

  getHomeSlider() {
    return this.heroBannerService.getHeroBanner()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.homeSliderData = res;
          if (this.swiperInstance) {
            this.initializeSwiper()
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  initializeSwiper() {
    this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: 'fade',
      modules: [EffectFade, Pagination],
      pagination: {
        el: '.tp-slider-dot',
        clickable: true
      },
      on: {
        slideChange: () => {
          this.swiperIndex = this.swiperInstance?.realIndex || 0;
        }
      }
    });
  }
}
