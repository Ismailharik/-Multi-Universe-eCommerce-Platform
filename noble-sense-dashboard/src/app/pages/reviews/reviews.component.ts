import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IReview } from 'src/app/models/review.model';
import { ReviewsService } from './services/reviews.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllReviews()
  }
  dataSource = new MatTableDataSource<IReview>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
   'productImage',
    // 'productTitle',
    'fullName',
    'description',
    'starsNumber',
    'approved',
    'action'
    // 'action'
  ];
  constructor(private reviewsService: ReviewsService, private destroyRef: DestroyRef) {
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getAllReviews(){
    this.reviewsService.getReviews()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: resp => {
        console.log(resp)
        this.dataSource.data = resp;
      },
      error: err => console.log(err.message)
    })
  }
  toggleApproval(reviewId:number){
    this.reviewsService.toggleApproveReview(reviewId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: resp => {
        
      },
      error: err => console.log(err.message)
    })
  }
  deleteReview(reviewId:number){
    this.reviewsService.deleteReview(reviewId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: resp => {
        this.getAllReviews()
      },
      error: err => console.log(err.message)
    })
  
  }
}
