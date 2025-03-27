import { DatePipe } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, Optional, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order, OrderStatus } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-dialog-content',
  templateUrl: './order-dialog-content.component.html',
  styleUrls: ['./order-dialog-content.component.scss']
})
export class OrderDialogContentComponent implements OnInit {
  destoryRef = inject(DestroyRef)


  // tslint:disable-next-line - Disables all
  action: string
  selectedImage: any = '';
  joiningDate: any = '';
  local_data: any
  orderForm!: FormGroup;
  orderStatus = OrderStatus;
  constructor(
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<OrderDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {
    this.local_data = { ...data }
    this.action = this.local_data.action
    this.initializeForm(this.local_data);
  }
  ngOnInit(): void {

  }

  doAction(): void {
    const data = this.orderForm.value
    this.dialogRef.close({ event: this.action, data: data });

  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }




  // Initialize or update the form with data
  initializeForm(order: Order): void {
    this.orderForm = this.fb.group({
      id: [order.id],
      orderStatus: [order.orderStatus, Validators.required],
      date: [order.date, ],
      orderItems: [order.orderItems, ],
      totalPrice: [order.totalPrice, ],
      user: [order.user],
    });
  }

  get orderId(): string {
    return this.local_data.id
  }

}