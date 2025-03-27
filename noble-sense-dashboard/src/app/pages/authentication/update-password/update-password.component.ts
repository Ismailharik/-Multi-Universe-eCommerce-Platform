import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CoreService } from 'src/app/services/core.service';
import { ChangePasswordRequest } from '../models/changePassword.model';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  destroyRef = inject(DestroyRef)

  changePasswordForm = new FormGroup({
    phone: new FormControl('', Validators.required),
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  options = this.settings.getOptions();

  // snak bar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private settings: CoreService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,

  ) { }



  get f() {
    return this.changePasswordForm.controls;
  }

  submit() {
    const updatedPass: ChangePasswordRequest = {
      phone: this.f['phone'].value!,
      oldPassword: this.f['oldPassword'].value!,
      newPassword: this.f['newPassword'].value!
    }
    this.authenticationService.changePassword(updatedPass)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.openSnackBar("Password Changed Successfully", "X");
          this.router.navigate(['/pages/customers']);
        },
        error: err => {
          this.openSnackBar(err.error.message, "X");
        }
      });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  // this.router.navigate(['/dashboards/dashboard1']);

  isValidForm() {
    return this.changePasswordForm.valid && this.f['newPassword'].value === this.f['confirmPassword'].value
  }
}
