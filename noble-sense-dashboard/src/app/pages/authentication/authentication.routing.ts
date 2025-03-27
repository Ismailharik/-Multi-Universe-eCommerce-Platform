import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'change-password',
        component: UpdatePasswordComponent,
      },
    ]
  },
];


