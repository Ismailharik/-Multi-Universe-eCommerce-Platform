import { Component, DestroyRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@/shared/services/product.service';
import { IReview } from '@/types/review-type';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReviewsService } from '@/shared/services/reviews.service';

@Component({
  selector: 'app-shop-details-form',
  templateUrl: './shop-details-form.component.html',
  styleUrls: ['./shop-details-form.component.scss'],
})
export class ShopDetailsFormComponent {
  public shopReviewForm!: FormGroup;
  public formSubmitted = false;
  public stars: number[] = [1, 2, 3, 4, 5]; // Array to iterate for stars
  productId!: string;

  constructor(
    private toastrService: ToastrService,
    private reviewsService: ReviewsService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.initializeForm();
    // productId from url
    this.productId = this.router.url.split('/')[3];
  }
  initializeForm() {
    this.shopReviewForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      description: new FormControl(null, Validators.required),
      starsNumber: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.shopReviewForm.valid) {
      const rate = this.shopReviewForm.value;
      this.saveRating(rate);
      // Reset the form
      this.shopReviewForm.reset();
      this.formSubmitted = false;
    }
  }

  get fullName() {
    return this.shopReviewForm.get('fullName');
  }
  get email() {
    return this.shopReviewForm.get('email');
  }
  get description() {
    return this.shopReviewForm.get('description');
  }
  get starsNumber() {
    return this.shopReviewForm.get('starsNumber');
  }


  setRating(rating: number) {
    this.shopReviewForm.get('starsNumber')?.setValue(rating);
  }
  saveRating(rate: IReview) {
    return this.reviewsService
      .addRating(rate, Number.parseInt(this.productId))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.toastrService.success(`Review sent successfully`);
          console.log('Rating saved successfully', resp);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }
}
