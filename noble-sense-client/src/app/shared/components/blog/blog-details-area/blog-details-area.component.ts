import { Component, Input } from '@angular/core';
import { IBlogType } from '@/types/blog-type';

@Component({
  selector: 'app-blog-details-area',
  templateUrl: './blog-details-area.component.html',
  styleUrls: ['./blog-details-area.component.scss']
})
export class BlogDetailsAreaComponent {
  @Input() blog!: IBlogType
}
