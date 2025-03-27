import { Component, OnInit, DestroyRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HomeSlider } from 'src/app/models/homeSlider.model';
import { HomeSliderService } from './services/home-slider.service';
import { HomeSliderDialogContentComponent } from './home-slider-dialog-content/home-slider-dialog-content.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent {
  searchText: any;
  displayedColumns: string[] = [
    'img',
    'preTitle',
    'title',
    'subtitle',
    'parent',
    'backgroundColor',
    'backgroundImg',

    // 'greenBg','id',
    'action',
  ];
  homeSlider: HomeSlider[] = [];

  dataSource = new MatTableDataSource<HomeSlider>([]);
  // snak bar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // image
  fullScreenImagePath!: string;
  showFullScreen: boolean = false;


  constructor(
    public dialog: MatDialog,
    private homeSliderService: HomeSliderService,
  ) {}
  ngOnInit(): void {
    this.getAllHomeSliders();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(HomeSliderDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addHomeSlider(result.data);
      } else if (result.event === 'Update') {
        this.updateHomeSlider(result.data);
      } else if (result.event === 'Delete') {
        this.deleteHomeSlider(result.data);
      }
    });
  }

  getAllHomeSliders() {
    this.homeSliderService.getAllHomeSliders().subscribe({
      next: (res) => {
        this.homeSlider = res;
        this.dataSource = new MatTableDataSource<HomeSlider>(this.homeSlider);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addHomeSlider(data: any) {
    this.homeSliderService.createHomeSlider(data).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllHomeSliders();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateHomeSlider(data: any) {
    console.log(data);
    this.homeSliderService.updateHomeSlider(data.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllHomeSliders();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteHomeSlider(data: any) {
    this.homeSliderService.deleteHomeSlider(data.id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllHomeSliders();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // handle image
  confirmDeleteImage(homeSlider: HomeSlider, url: string): void {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this image?'
    );

    if (confirmDelete) {
      // Perform deletion logic here
      // Assuming 'element' is the object containing the image paths
      // Remove the image path at the specified index
      this.homeSliderService.deleteImageFromHomeSlider(homeSlider.id, url).subscribe({
        next: resp => {
          this.getAllHomeSliders()
        },
        error: err => console.log(err)
      })
      // Call a service method to delete the image from the server if needed
      // For example: this.imageService.deleteImage(element.src[index]).subscribe();
    }
  }
  // Function to expand the image to full screen
  expandImage(event: any, src: string) {
    this.fullScreenImagePath = src;
    this.showFullScreen = true;
  }

  // Function to close the full-screen image
  closeImage() {
    this.showFullScreen = false;
    this.fullScreenImagePath = '';
  }
  addBackgroundImage(siderId:number,event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = 'Only images are supported';
      return;
    }
    // now I can save the image
    const file = event.target.files[0];
    
    // save background file 
    this.homeSliderService.addBackgroundImageToHomeSlider(siderId, file).subscribe(
      {
        next: updatedProduct => {
          
          this.getAllHomeSliders();
          console.log('Product with added image:', updatedProduct);
        },
        error: error => {
          // Handle error
          console.error('Error adding image to product:', error);
        }
      }
    )
  }
}
