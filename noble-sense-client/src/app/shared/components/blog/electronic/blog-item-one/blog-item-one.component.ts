import { IBlogType } from '@/types/blog-type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-item-one',
  templateUrl: './blog-item-one.component.html',
  styleUrls: ['./blog-item-one.component.scss']
})
export class BlogItemOneComponent {

  @Input() blog!: IBlogType
}
