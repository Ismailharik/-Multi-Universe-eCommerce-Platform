import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ReclamationsService } from '@/shared/services/reclamations.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  public contactForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService, private reclamationsService:ReclamationsService) { }

  ngOnInit () {
    this.contactForm = new FormGroup({
      fullName:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      phone:new FormControl(null,Validators.required),
      subject:new FormControl(null,Validators.required),
      message:new FormControl(null,Validators.required),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      console.log('contact-form-value', this.contactForm.value);
      this.saveReclamation()
    }
  }

  get fullName() { return this.contactForm.get('fullName') }
  get email() { return this.contactForm.get('email') }
  get phone() { return this.contactForm.get('phone') }
  get subject() { return this.contactForm.get('subject') }
  get message() { return this.contactForm.get('message') }

  saveReclamation(){
    this.reclamationsService.addReclamation(this.contactForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.success(`Reclamation sent successfully`);
      // Reset the form
      this.contactForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
      },
      error:(err)=>{
        console.log(err)
      }
    }
    )
  }
}
