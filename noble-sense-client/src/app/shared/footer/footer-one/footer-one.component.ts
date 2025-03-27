import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent {
  @Input () style_2 : Boolean = false;
  @Input () primary_style : Boolean = false;
  @Input () style_3 : Boolean = false;

  getYear () {
    return new Date().getFullYear();
  }
}
