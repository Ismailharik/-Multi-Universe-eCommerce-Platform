import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { UsersService } from '@/shared/services/users.service';
import { IUser } from '@/types/user-type';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  isShowPass = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService, private usersService:UsersService ) { }

  ngOnInit () {
    this.registerForm = new FormGroup({
      fullName:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      address:new FormControl(null,[]),
      phone: new FormControl(null,[]),
      role: new FormControl("USER",[]),
      password:new FormControl("1234",[]),
    })

   

  }

  saveUserInformations(){
    let user:IUser = this.registerForm.value;
    user.active=true

  
    console.log("user", user)
    this.usersService.saveUserInformations(user).subscribe({
      next: resp =>{
        console.log("saved user", resp)
        this.toastrService.success("user "+ resp.fullName+" saved successfully")
      }
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      console.log('register-form-value', this.registerForm.value);
      this.toastrService.success(`Message sent successfully`);
      this.saveUserInformations()

      // Reset the form
      this.registerForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }else{
      this.toastrService.warning(`Please fill all the required fields` );
    }
  }

  get name() { return this.registerForm.get('fullName') }
  get email() { return this.registerForm.get('email') }
  get address() { return this.registerForm.get('address') }
  get phone() { return this.registerForm.get('phone') }
}
