import { Component } from '@angular/core';

@Component({
  selector: 'app-header-top-bar',
  templateUrl: './header-top-bar.component.html',
  styleUrls: ['./header-top-bar.component.scss'],
})
export class HeaderTopBarComponent {
  public isActive: string = '';

  handleActive = (type: string) => {
    if (type === this.isActive) {
      this.isActive = '';
    } else {
      this.isActive = type;
    }
  };
}
