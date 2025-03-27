import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Swiper from 'swiper';
import { IBlogType } from '@/types/blog-type';
import { UtilsService } from '@/shared/services/utils.service';

@Component({
  selector: 'app-blog-postbox-item',
  templateUrl: './blog-postbox-item.component.html',
  styleUrls: ['./blog-postbox-item.component.scss'],
})
export class BlogPostboxItemComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;

  @Input() blog!: IBlogType;

  constructor(
    public utilsService: UtilsService,
    public sanitizer: DomSanitizer
  ) { };

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 3000,
        },
      });
    }
  }
}
