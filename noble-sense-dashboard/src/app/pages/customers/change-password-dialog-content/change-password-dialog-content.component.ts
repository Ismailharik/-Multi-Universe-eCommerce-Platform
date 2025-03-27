import { Component, DestroyRef, Inject, Optional, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-dialog-content',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password-dialog-content.component.html',
  styleUrls: ['./change-password-dialog-content.component.scss']
})
export class ChangePasswordDialogContentComponent {
  destroyRef=inject(DestroyRef)


  userForm: FormGroup = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
  });

  local_data: any
  action!: string

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogContentComponent>,
    private customerService: CustomerService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.local_data = { ...data }

  }

  doAction() {
    // update user password
    this.dialogRef.close({ event: this.action, data: this.userForm.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
