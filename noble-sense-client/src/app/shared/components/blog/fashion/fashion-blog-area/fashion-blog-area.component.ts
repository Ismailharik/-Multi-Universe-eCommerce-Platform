import  blogData from '@/data/blog-data';
import { IBlogType } from '@/types/blog-type';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fashion-blog-area',
  templateUrl: './fashion-blog-area.component.html',
  styleUrls: ['./fashion-blog-area.component.scss']
})
export class FashionBlogAreaComponent {
  public fashion_blogs:IBlogType[] = blogData.filter(b => b.blog === 'fashion')
}
