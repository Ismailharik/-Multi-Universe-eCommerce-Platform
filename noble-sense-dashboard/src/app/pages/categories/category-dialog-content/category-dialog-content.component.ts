import { DatePipe } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, Optional, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from '../services/category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-dialog-content',
  templateUrl: './category-dialog-content.component.html',
  styleUrls: ['./category-dialog-content.component.scss']
})
export class CategoryDialogContentComponent implements OnInit {
  destroyRef=inject(DestroyRef)

  // tslint:disable-next-line - Disables all
  action: string
  selectedImage: any = '';
  joiningDate: any = '';
  local_data: any
  categoryForm!: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<CategoryDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ICategory,
  ) {
    this.local_data = { ...data }
    this.action = this.local_data.action
    this.initializeForm(this.local_data);
  }
  ngOnInit(): void {

  }

  doAction(): void {
    const data = this.categoryForm.value
    this.dialogRef.close({ event: this.action, data: data });

  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    const file = event.target.files[0];
    this.categoryService.addImageToCategory(this.local_data.id, file)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (updatedCategory) => {
       this.initializeForm(updatedCategory)
        console.log('Category with added image:', updatedCategory);
      },
      error: (error) => {
        console.error('Error adding image to category:', error);
      }
  });

}




// Initialize or update the form with data
initializeForm(category: ICategory): void {
  this.categoryForm = this.fb.group({
    id: [category.id],
    img: [category.img],
    description: [category.description, Validators.required],
    parent: [category.parent,Validators.required],
    name: [category.name, Validators.required],
    numberOfProducts:[category.numberOfProducts]
  });
}
  get categoryName(): string {
  return this.data.name
}

}