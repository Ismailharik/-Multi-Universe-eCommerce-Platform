import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IFeature } from '@/data/feature-data';
import feature_data from '@/data/feature-data';

@Component({
  selector: 'app-feature-two',
  templateUrl: './feature-two.component.html',
  styleUrls: ['./feature-two.component.scss']
})
export class FeatureTwoComponent {

  public feature_items:IFeature[] = feature_data;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
