import { DatePipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role, User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admins-dialog-content',
  templateUrl: './admins-dialog-content.component.html',
})
export class AdminsDialogContentComponent {

  
    // tslint:disable-next-line - Disables all
    action: string
    selectedImage: any = '';
    joiningDate: any = '';
    local_data: any
    userForm!: FormGroup;
    constructor(
      private fb: FormBuilder,
      public datePipe: DatePipe,
      public dialogRef: MatDialogRef<AdminsDialogContentComponent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: User,
    ) {
      this.local_data = { ...data }
      this.action = this.local_data.action
      this.initializeForm(this.local_data);
    }
    ngOnInit(): void {
  
    }
  
    doAction(): void {
      const data = this.userForm.value;
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
      // tslint:disable-next-line - Disables all
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  
  
  
  
    // Initialize or update the form with data
    initializeForm(data: User): void {
      this.userForm = this.fb.group({
        id: [data.id],
        fullName: [data.fullName, Validators.required],
        email: [data.email, ''],
        password: [data.password, Validators.required],
        phone: [data.phone, Validators.required],
        address: [data.address, ''],
        role: [Role.ADMIN],
        active: [data.active],
      });
    }
    get username(): string {
      return this.data.fullName
    }
  
  }