import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IBlogType } from '@/types/blog-type';
import blogData from '@/data/blog-data';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  public blogs: IBlogType[] = [];
  public pageNo: number = 1;
  public paginate: any = {};
  public startIndex: number = 0;
  public endIndex: number = 4;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
  ) {}

  ngOnInit() {
    this.blogs = blogData.filter((b) => b.blog === 'blog-postbox')
  }


  handlePagination(event: any): void {
    const { data, start, end } = event;
    console.log('data', data, 'start', start, 'end', end);
    this.startIndex = start;
    this.endIndex = end;
  }

  // }

  // product Pagination
  // setPage(page: number) {
  //   this.router
  //     .navigate([], {
  //       relativeTo: this.route,
  //       queryParams: { page: page },
  //       queryParamsHandling: 'merge', // preserve the existing query params in the route
  //     })
  //     .then(() => {
  //       this.viewScroller.setOffset([120, 120]);
        // Update the current page subject
  //       this.currentPageSubject.next(page);
        // Update Pagination
  //       this.updatePagination();
  //     });
  // }
}
