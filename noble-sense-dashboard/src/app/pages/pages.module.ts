import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../material.module';


// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


import { PagesRoutes } from './pages-routing.module';
import { MatNativeDateModule } from '@angular/material/core';

// customers
import { CustomersComponent } from './customers/customers.component';
import { CustomersDialogContentComponent } from './customers/customers-dialog-content/customers-dialog-content.component';
import { AddCustomerComponent } from './customers/add/add.component';

// admins
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add/add.component';
import { AdminsDialogContentComponent } from './admins/admins-dialog-content/admins-dialog-content.component';
// products
import { ProductsComponent } from './products/products.component';
import { ProductDialogContentComponent } from './products/product-dialog-content/product-dialog-content.component';
import {  AddProductComponent } from './products/add/add.component';
// categories
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent} from './categories/add/add.component';
import { CategoryDialogContentComponent } from './categories/category-dialog-content/category-dialog-content.component';
// orders
import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './orders/add/add.component';
import { OrderDialogContentComponent } from './orders/order-dialog-content/order-dialog-content.component';
import { MatChipsModule } from '@angular/material/chips';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomeSliderDialogContentComponent } from './home-slider/home-slider-dialog-content/home-slider-dialog-content.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { ReclamationDialogComponent } from './reclamations/reclamation-dialog/reclamation-dialog.component';



@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    HttpClientModule,
    // AngularEditorModule,
    MatNativeDateModule,
    NgScrollbarModule,

  ],
  exports:[
    TablerIconsModule,
  ],
  providers: [DatePipe],

  declarations: [
    // customers
    CustomersComponent,
    CustomersDialogContentComponent,
    AddCustomerComponent,
    // admins
    AdminsComponent,
    AddAdminComponent,
    AdminsDialogContentComponent,
    // products
    ProductsComponent,
    ProductDialogContentComponent,
    AddProductComponent,
    // categories
    CategoriesComponent,
    AddCategoryComponent,
    CategoryDialogContentComponent,
    //orders 
    OrdersComponent,
    AddOrderComponent,
    OrderDialogContentComponent,
    HomeSliderComponent,
    HomeSliderDialogContentComponent,
    ReviewsComponent,
    ReclamationsComponent,
    ReclamationDialogComponent,
  ]
})
export class PagesModule { }
