import { Component,Input } from '@angular/core';
import { IBlogType } from '@/types/blog-type';

@Component({
  selector: 'app-blog-grid-item',
  templateUrl: './blog-grid-item.component.html',
  styleUrls: ['./blog-grid-item.component.scss']
})
export class BlogGridItemComponent {
  @Input () blog!:IBlogType;
}
