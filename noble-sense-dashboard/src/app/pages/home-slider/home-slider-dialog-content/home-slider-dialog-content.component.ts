import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HomeSlider } from 'src/app/models/homeSlider.model';
import { HomeSliderService } from '../services/home-slider.service';

@Component({
  selector: 'app-home-slider-dialog-content',
  templateUrl: './home-slider-dialog-content.component.html',
  styleUrls: ['./home-slider-dialog-content.component.scss']
})
export class HomeSliderDialogContentComponent {


  homeSliderForm!: FormGroup;
  action!: string;

  // image attributes
  selectedImage: any = '';
  joiningDate: any = '';
  local_data: any
  productForm!: FormGroup;
  msg!: string
  file!:File // to detect if the file changed
  // end image attributes

  constructor(
    private homeSliderService: HomeSliderService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HomeSliderDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.local_data = { ...data }
    this.action = this.local_data.action
    this.initializeForm(this.local_data);
  }


  initializeForm(data: HomeSlider): void {
    this.homeSliderForm = this.fb.group({

      //preTitle
      preTitle: this.fb.group({
        text: [data?.preTitle?.text || '', ],
        price: [data?.preTitle?.price || 0, ],
      }),

      //subtitle
      subtitle: this.fb.group({
        text1: [data?.subtitle?.text1 || '', ],
        percent: [data?.subtitle?.percent || 0,],
        text2: [data?.subtitle?.text2 || '', ],
      }),

      id: [data?.id || ''],
      title: [data?.title || '', ],
      img: [data?.img || '',],
      parent: [data?.parent || '', Validators.required],
      backgroundColor: [data?.backgroundColor || '',],

    });
  }


  doAction(): void {
    const formData = this.homeSliderForm.value;
    // Add logic to handle different actions (create/update)
    // You can call the service methods here
    this.dialogRef.close({ event: this.action, data: formData });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    // now I can save the image
    this.file = event.target.files[0];

    this.homeSliderService.addImageToHomeSlider(this.local_data.id, this.file).subscribe(
      {
        next: updatedProduct => {
          // Handle success - updated product with added image
          this.local_data = updatedProduct;
          this.initializeForm( updatedProduct);
          console.log('Product with added image:', updatedProduct);
        },
        error: error => {
          // Handle error
          console.error('Error adding image to product:', error);
        }
      }
    );
  }

}
