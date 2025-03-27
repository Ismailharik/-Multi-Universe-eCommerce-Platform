import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReview } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {


  private apiUrl =environment.host+ "/api/v1/reviews";
  constructor(private http: HttpClient) { }

  getReviews(){
    return this.http.get<IReview[]>(this.apiUrl);
  }
  getReviewById(id: number){
    return this.http.get<IReview>(`${this.apiUrl}/${id}`);
  }
  toggleApproveReview(id:number){
    return this.http.put<IReview>(`${this.apiUrl}/toggle-approve/${id}`, {})
  }
  deleteReview(reviewId: number) {
    return this.http.delete(`${this.apiUrl}/${reviewId}`)
  }

}
