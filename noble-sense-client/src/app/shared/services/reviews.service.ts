import { IProductReviewsDetails } from '@/types/product-reviews-details';
import {  IReview } from '@/types/review-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  getProductReviews(id: number) {
    return this.http.get<IReview[]>(`${this.baseUrl}/product/${id}`);
  }


  private baseUrl = environment.host+'/api/v1/reviews'
  constructor(private http:HttpClient) { }
  addRating(rating: IReview, productId: number): Observable<IReview> {
    return this.http.post<IReview>(this.baseUrl+"/"+productId, rating);
  }
  getProductReviewsDetails(id: number) {
    return this.http.get<IProductReviewsDetails>(`${this.baseUrl}/product-reviews-details/${id}`);
  }

}
