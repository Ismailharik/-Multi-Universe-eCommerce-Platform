import { IProduct } from '@/types/product-type';
import { Component,Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent {
  @Input() productId!: number;
  @Input() category!: string;
  public related_products: IProduct[] = []; // Replace with your product interface

  constructor(private productService: ProductService) {}

  private loadRelatedProducts() {
    if (this.productId && this.category) {
      this.productService
        .getRelatedProducts(this.productId, this.category)
        .subscribe((products) => {
          this.related_products = products;
        });
    }
  }

  ngOnInit(): void {
    // loadRelatedProducts
    this.loadRelatedProducts();
    // swiper activated
    new Swiper('.tp-product-related-slider-active', {
      slidesPerView: 4,
      spaceBetween: 24,
      modules:[Scrollbar],
      scrollbar: {
        el: ".tp-related-swiper-scrollbar",
        draggable: true,
        dragClass: "tp-swiper-scrollbar-drag",
        snapOnRelease: true,
      },
      breakpoints: {
        "1200": {
          slidesPerView: 4,
        },
        "992": {
          slidesPerView: 3,
        },
        "768": {
          slidesPerView: 2,
        },
        "576": {
          slidesPerView: 2,
        },
        "0": {
          slidesPerView: 1,
        },
      }
    });
  }
}
