import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { DynamicBlogDetailsComponent } from './blog/dynamic-blog-details/dynamic-blog-details.component';
import { CouponComponent } from './coupon/coupon.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'contact',
    component:ContactComponent,
    title:'Contact Page'
  },
  {
    path:'blog',
    component:BlogComponent,
    title:'Blog Page'
  },
  {
    path:'blog-grid',
    component:BlogGridComponent,
    title:'Blog Grid Page'
  },
  {
    path:'blog-list',
    component:BlogListComponent,
    title:'Blog List Page'
  },
  {
    path:'blog-details',
    component:BlogDetailsComponent,
    title:'Blog Details Page'
  },
  {
    path:'blog-details/:id',
    component:DynamicBlogDetailsComponent,
    title:'Blog Details Page'
  },
  {
    path:'coupons',
    component:CouponComponent,
    title:'Coupon Page'
  },
  {
    path:'about',
    component:AboutComponent,
    title:'About Page'
  },
  {
    path:'login',
    component:LoginComponent,
    title:'Login Page'
  },
  {
    path:'register',
    component:RegisterComponent,
    title:'Register Page'
  },
  {
    path:'forgot',
    component:ForgotPasswordComponent,
    title:'Forgot Page'
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    title:'Checkout Page'
  },
  {
    path:'profile',
    component:ProfileComponent,
    title:'Profile Page'
  },
  {
    path:'search',
    component:SearchComponent,
    title:'Search Page'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
