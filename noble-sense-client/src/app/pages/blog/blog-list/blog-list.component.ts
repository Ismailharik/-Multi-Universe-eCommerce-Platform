import { Component,Input } from '@angular/core';
import { IBlogType } from '@/types/blog-type';
import blogData from '@/data/blog-data';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {

  public blogs: IBlogType[] = [];
  public startIndex: number = 0;
  public endIndex: number = 6;

  ngOnInit() {
    this.blogs = blogData.filter((b) => b.blog === 'blog-grid');
  }

  handlePagination(event: any): void {
    const { data, start, end } = event;
    this.startIndex = start;
    this.endIndex = end;
  }
}
