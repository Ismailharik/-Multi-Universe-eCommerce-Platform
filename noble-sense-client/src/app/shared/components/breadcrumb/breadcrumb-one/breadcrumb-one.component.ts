import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-one',
  templateUrl: './breadcrumb-one.component.html',
  styleUrls: ['./breadcrumb-one.component.scss']
})
export class BreadcrumbOneComponent {

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
}
