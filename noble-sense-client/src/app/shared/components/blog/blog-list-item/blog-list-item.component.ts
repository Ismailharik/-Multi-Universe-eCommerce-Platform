import { Component,Input } from '@angular/core';
import { IBlogType } from '@/types/blog-type';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent {
  @Input () blog!:IBlogType;
}
