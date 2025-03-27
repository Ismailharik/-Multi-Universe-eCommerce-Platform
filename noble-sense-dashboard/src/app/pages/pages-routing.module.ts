import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AdminsComponent } from './admins/admins.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';

import { Role } from '../models/user.model';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';

export const PagesRoutes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    data: {
  title: 'Page Des Clients',//this link will be displayed on the page header
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Customers' },
      ],
    },
  },
  {
    path: 'admins',
    component: AdminsComponent,
    data: {
      title: 'Page Des Admins',//this link will be displayed on the page header
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Admins' },
      ],
    },
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      title: 'Page Des Produits',//this link will be displayed on the page header
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Products' },
      ],
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      title: 'Page Des Categories',//this link will be displayed on the page header
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Categories' },
      ],
    },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: {
      title: 'Page Des Commandes',//this link will be displayed on the page header
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Orders' },
      ],
    },
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    data: {
      title: 'Reviews ',
  urls: [{ title: 'Reviews', url: '/dashboards/dashboard1' }, { title: 'Clients Reviews' }],
    }
  },
  {
    path: 'home-slider',
    component: HomeSliderComponent,
    data: {
      title: 'Homes Sliders',
  urls: [{ title: 'Dashboard', url: '/dashboards/dashboard1' }, { title: 'Homes Sliders' }],
    }
  },
  {
    path: 'reclamations',
    component: ReclamationsComponent,
    data: {
      title: 'Customers Reclamations',
  urls: [{ title: 'Dashboard', url: '/dashboards/dashboard1' }, { title: 'Customers Reclamations' }],
    }
  }

];
