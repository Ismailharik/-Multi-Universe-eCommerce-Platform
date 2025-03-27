import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="branding">
      <a href="/" *ngIf="options.theme === 'light'">
        <img width="200" 
          src="./assets/images/logos/wp-harik.png"
          class="align-middle m-2 rounded"
          alt="logo ns"
        />
      </a>
      <a href="/" *ngIf="options.theme === 'dark'">
        <img width="200"
          src="./assets/images/logos/wp-harik.png"
          class="align-middle m-2 rounded"
          alt="logo ns"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
 
  constructor(private settings: CoreService) {}
}
