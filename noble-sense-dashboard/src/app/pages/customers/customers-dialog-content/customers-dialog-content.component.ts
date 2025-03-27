import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  Role, User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/services/authentication.service';
@Component({
  selector: 'app-customers-dialog-content',
  templateUrl: './customers-dialog-content.component.html',
  styles: [`
  `]
})
export class CustomersDialogContentComponent implements OnInit {



  // tslint:disable-next-line - Disables all
  action: string
  selectedImage: any = '';
  joiningDate: any = '';
  local_data: any
  userForm!: FormGroup;
  isAdmin: boolean = false;
  isManager: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<CustomersDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    this.local_data = { ...data }
    this.action = this.local_data.action
    this.initializeForm(this.local_data);
  }
  ngOnInit(): void {
    const role = this.authService.getUserRole()

    if (role === Role.ADMIN) {
      this.isAdmin = true
    }
    
  }

  doAction(): void {
    const data = this.userForm.value
    this.dialogRef.close({ event: this.action, data: data });

  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }






  // Initialize or update the form with data
  initializeForm(data: User): void {
    this.userForm = this.fb.group({
      id: [data.id],
      fullName: [data.fullName || '', Validators.required],
      email: [data.email || ''],
      phone: [data.phone || '', Validators.required],
      address: [data.address || ''],
      active: [data.active || false],
    });
  }
  get username(): string {
    return this.data.fullName
  }

}