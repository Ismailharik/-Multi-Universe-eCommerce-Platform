import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from '@/types/order-type';
import { IUser} from '@/types/user-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  isOpenLogin = false;
  isOpenCoupon = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: string = '';

  constructor(public cartService: CartService,private toastrService: ToastrService) { }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
  }
  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }

  public countrySelectOptions = [
    { value: 'select-country', text: 'Select Country' },
    { value: 'berlin-germany', text: 'Germany' },
    { value: 'paris-france', text: 'France' },
    { value: 'tokiyo-japan', text: 'Morocco' },
    { value: 'new-york-us', text: 'US' },
  ];

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);

    // Update the 'country' form control with the selected option's value
    this.checkoutForm.patchValue({
      country: selectedOption.text
    });
  }


  handleCouponSubmit() {
    console.log(this.couponCode);
    // Add coupon code handling logic here
    if (this.couponCode) {
      // logic here

      // when submitted the from than empty will be coupon code
      this.couponCode = ''
    }
  }

  // handle payment item
  handlePayment(value: string) {
    this.payment_name = value
  }

  public checkoutForm!: FormGroup;
  public formSubmitted = false;



  ngOnInit () {
    this.checkoutForm = new FormGroup({
      fullName:new FormControl(null,Validators.required),
      country:new FormControl(null,Validators.required),
      address:new FormControl(null,Validators.required),
      phone:new FormControl(null,Validators.required),
      orderNote:new FormControl(null),
      email:new FormControl(null,[Validators.required,Validators.email]),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    
    if (this.checkoutForm.valid) {
      console.log('checkout-form-value', this.checkoutForm.value);
      const user:IUser ={
        id: '',
        fullName: this.checkoutForm.value.fullName,
        phone: this.checkoutForm.value.phone,
        email: this.checkoutForm.value.email,
        address: this.checkoutForm.value.address
      };

      const order: IOrder = {
        user: user,
        orderItems: this.cartService.getOrderItems(),
        orderNote:this.checkoutForm.value.orderNote,
        address: this.checkoutForm.value.address,
        country: this.checkoutForm.value.country,
        date: new Date(),
        totalPrice:(this.cartService.totalPriceQuantity().total + this.shipCost).toFixed(2),
        shipCost:this.shipCost
      };
      console.log("total price", this.cartService.totalPriceQuantity().total)
      console.log("ship cost", this.shipCost)
      this.saveOrder(order);
    }
    console.log('checkout-form', this.checkoutForm.value);
  }

  saveOrder(order: IOrder) {
    console.log(order)
    this.cartService.saveOrder(order).subscribe({
      next: (resp) => {
      this.toastrService.success(`Order successfully`);
      // Reset the form
      this.checkoutForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
      console.log(resp)
      },
      error: (err) => {
       this.toastrService.error(err.error.message);
      }
    })
  }



  get fullName() { return this.checkoutForm.get('fullName') }
  get email() { return this.checkoutForm.get('email') }
  get phone() { return this.checkoutForm.get('phone') }
  get country() { return this.checkoutForm.get('country') }
  get address() { return this.checkoutForm.get('address') }
  get orderNote() { return this.checkoutForm.get('orderNote') }
}
