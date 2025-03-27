import { Component } from '@angular/core';
import { IBlogType } from '@/types/blog-type';
import { ActivatedRoute, Router } from '@angular/router';
import blogData from '@/data/blog-data';

@Component({
  selector: 'app-dynamic-blog-details',
  templateUrl: './dynamic-blog-details.component.html',
  styleUrls: ['./dynamic-blog-details.component.scss']
})
export class DynamicBlogDetailsComponent {

  public blog: IBlogType | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.blog = blogData.find(b => b.id === Number(blogId))
    }
    else {
      this.router.navigate(['/404']);
    }
  }
}
