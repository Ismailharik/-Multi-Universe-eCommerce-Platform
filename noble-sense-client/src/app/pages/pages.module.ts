import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from './../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { BlogComponent } from './blog/blog/blog.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { DynamicBlogDetailsComponent } from './blog/dynamic-blog-details/dynamic-blog-details.component';
import { CouponComponent } from './coupon/coupon.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';





@NgModule({
  declarations: [
    ContactComponent,
    BlogComponent,
    BlogGridComponent,
    BlogListComponent,
    BlogDetailsComponent,
    DynamicBlogDetailsComponent,
    CouponComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    CheckoutComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ShopModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
