import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  public forgotForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService) { }

  ngOnInit () {
    this.forgotForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email])
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.forgotForm.valid) {
      console.log('forgot-form-value', this.forgotForm.value);
      this.toastrService.success(`Message sent successfully`);

      // Reset the form
      this.forgotForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }
  }

  get email() { return this.forgotForm.get('email') }
}
