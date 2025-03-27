import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { RegisterRequest } from '../models/registerRequest.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';




@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  styleUrls: ['./side-login.component.scss'],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  destroyRef = inject(DestroyRef)


  returnUrl: string = '';
  options = this.settings.getOptions();


    // snak bar config
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private authenticationService: AuthenticationService,
    private settings: CoreService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/products';
  }

  form = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required]),
  });
  get f() {
    return this.form.controls;
  }

  submit() {
    const register: RegisterRequest = {
      phone: this.f['phone'].value!,
      password: this.f['password'].value!
    }
    this.authenticationService.login(register)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
  this.openSnackBar(`${resp.fullName} authentifié avec succes`, "X");
          this.router.navigate(['/pages/customers']);
        }
        , error: err => {
          this.openSnackBar("les informations d'identification invalides", "X");
        }
      })

  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

}
