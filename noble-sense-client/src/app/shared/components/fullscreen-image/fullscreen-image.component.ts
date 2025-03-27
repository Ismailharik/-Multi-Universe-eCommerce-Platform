import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss']
})
export class FullscreenImageComponent {


  @Input() imageSrc: string | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.imageSrc)
    if (changes['imageSrc'] && changes['imageSrc'].currentValue) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto'; // Allow background scrolling
    }
  }

  close() {
    this.imageSrc = null;
    document.body.style.overflow = 'auto'; // Restore background scrolling
  }
}
