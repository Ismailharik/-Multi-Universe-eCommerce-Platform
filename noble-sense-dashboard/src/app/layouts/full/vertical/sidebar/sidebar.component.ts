import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandingComponent } from './branding.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BrandingComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
