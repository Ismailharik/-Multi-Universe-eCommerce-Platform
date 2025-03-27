import { Component, Input } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  @Input() imageSrc: string | null = null;
  zoomLevel: number = 1;

  constructor() {}

  ngOnInit(): void {}

  get zoomStyle() {
    return `scale(${this.zoomLevel})`;
  }

  open() {
   // I used setTimeout to wait until the image is completely loaded from parent component
    setTimeout(() => {
      if(this.imageSrc){
        const modalElement = document.getElementById('imageModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
  
        modalElement?.addEventListener('hidden.bs.modal', () => {
          this.imageSrc = null;
          this.zoomLevel = 1; // Reset zoom level when modal is closed
        });
      }
     
    }, 100);
  }

  close() {
    const modalElement = document.getElementById('imageModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  zoomIn() {
    this.zoomLevel += 0.1;
  }

  zoomOut() {
    if (this.zoomLevel > 1) {
      this.zoomLevel -= 0.1;
    }
  }

  onWheel(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
    event.preventDefault();
  }
}
