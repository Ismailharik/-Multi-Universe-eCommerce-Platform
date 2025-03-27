import { Component,ElementRef,Renderer2,ViewChild,Input, OnInit } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from '@/shared/services/product.service';
import { ReviewsService } from '@/shared/services/reviews.service';
import { IProductReviewsDetails } from '@/types/product-reviews-details';
import { IReview } from '@/types/review-type';

@Component({
  selector: 'app-product-details-tab-nav',
  templateUrl: './product-details-tab-nav.component.html',
  styleUrls: ['./product-details-tab-nav.component.scss']
})
export class ProductDetailsTabNavComponent implements OnInit {
  @ViewChild('navActive') navActive!: ElementRef;
  @ViewChild('productTabMarker') productTabMarker!: ElementRef;

  @Input () product! : IProduct;

  // additional variables
  productReviewsDetails!:IProductReviewsDetails
  reviews:IReview[] = []

  constructor(private renderer: Renderer2, private reviewsService: ReviewsService) {}
  ngOnInit(): void {
    this.getProductReviewsDetails()
    this.getProductReviews()
  }

  handleActiveMarker(event: Event): void {
    const marker = document.getElementById("productTabMarker");
    if (marker && event.target) {
      marker.style.left = (event.target as HTMLButtonElement).offsetLeft + "px";
      marker.style.width = (event.target as HTMLButtonElement).offsetWidth + "px";
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.setStyle(this.productTabMarker.nativeElement, 'left', this.navActive.nativeElement.offsetLeft + 'px');
      this.renderer.setStyle(this.productTabMarker.nativeElement, 'width', this.navActive.nativeElement.offsetWidth + 'px');
    }, 0);
  }

  // additional methods
  getProductReviewsDetails() {
    this.reviewsService.getProductReviewsDetails(this.product.id).subscribe({
      next: (data) => {
        this.productReviewsDetails = data;
        console.log("product reviews", data)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getProductReviews(){
    this.reviewsService.getProductReviews(this.product.id).subscribe({
      next: (data) => {
        console.log("product reviews", data)
        this.reviews = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }



}
