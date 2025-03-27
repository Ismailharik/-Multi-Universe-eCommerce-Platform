import { IBlogType } from '@/types/blog-type';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-blog-item-two',
  templateUrl: './blog-item-two.component.html',
  styleUrls: ['./blog-item-two.component.scss']
})
export class BlogItemTwoComponent {

  @Input() blog!: IBlogType
}
