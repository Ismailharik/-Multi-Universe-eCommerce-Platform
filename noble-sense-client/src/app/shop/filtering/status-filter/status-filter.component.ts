import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss'],
})
export class StatusFilterComponent {
  status: string[] = ['On sale', 'In Stock','Out of stock'];
  activeQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['status'];
    });
  }

  handleStatusRoute(status: string): void {
    const newStatus = status.toLowerCase().split(' ').join('-');
    // Define the query parameters as an object
    const queryParams: Params = {
      status: newStatus,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Anchore Link
      });
  }
}
