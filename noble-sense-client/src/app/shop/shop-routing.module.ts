import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { ShopCategoryComponent } from './pages/shop-category/shop-category.component';
import { ShopLoadMoreComponent } from './pages/shop-load-more/shop-load-more.component';
import { ShopNoSidebarComponent } from './pages/shop-no-sidebar/shop-no-sidebar.component';
import { ShopFullWidthComponent } from './pages/shop-full-width/shop-full-width.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShopRightSidebarComponent } from './pages/shop-right-sidebar/shop-right-sidebar.component';
import { ShopFilterDropdownComponent } from './pages/shop-filter-dropdown/shop-filter-dropdown.component';
import { ShopFilterOffcanvasComponent } from './pages/shop-filter-offcanvas/shop-filter-offcanvas.component';
import { ShopSixteenThousandPxComponent } from './pages/shop-sixteen-thousand-px/shop-sixteen-thousand-px.component';
import { DynamicProductDetailsComponent } from './pages/dynamic-product-details/dynamic-product-details.component';
import { ProductDetailsWithCountdownComponent } from './pages/product-details-with-countdown/product-details-with-countdown.component';
import { ProductDetailsWithVideoComponent } from './pages/product-details-with-video/product-details-with-video.component';
import { ProductDetailsListComponent } from './pages/product-details-list/product-details-list.component';
import { ProductDetailsGalleryComponent } from './pages/product-details-gallery/product-details-gallery.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CompareComponent } from './pages/compare/compare.component';
import { OrderComponent } from './pages/order/order.component';



const routes: Routes = [
  {
    path:'shop',
    component:ShopComponent,
    title:'Shop Page'
  },
  {
    path:'shop-list',
    component:ShopListComponent,
    title:'Shop List Page'
  },
  {
    path:'shop-full-width',
    component:ShopFullWidthComponent,
    title:'Shop Full Width Page'
  },
  {
    path:'shop-1600',
    component:ShopSixteenThousandPxComponent,
    title:'Shop 1600 Page'
  },
  {
    path:'shop-right-sidebar',
    component:ShopRightSidebarComponent,
    title:'Shop Right Sidebar Page'
  },
  {
    path:'shop-no-sidebar',
    component:ShopNoSidebarComponent,
    title:'Shop No Sidebar Page'
  },
  {
    path:'shop-filter-dropdown',
    component:ShopFilterDropdownComponent,
    title:'Shop Filter Dropdown Page'
  },
  {
    path:'shop-filter-offcanvas',
    component:ShopFilterOffcanvasComponent,
    title:'Shop Filter Offcanvas Page'
  },
  {
    path:'shop-load-more',
    component:ShopLoadMoreComponent,
    title:'Shop Load More Page'
  },
  {
    path:'shop-category',
    component:ShopCategoryComponent,
    title:'Shop Category Page'
  },
  {
    path:'shop-details',
    component:ProductDetailsComponent,
    title:'Shop Details Page'
  },
  {
    path:'shop-details/:id',
    component:DynamicProductDetailsComponent,
    title:'Shop Details Page'
  },
  {
    path:'shop-details-with-video',
    component:ProductDetailsWithVideoComponent,
    title:'Shop Details With Video Page'
  },
  {
    path:'shop-details-with-countdown',
    component:ProductDetailsWithCountdownComponent,
    title:'Shop Details With Countdown Page'
  },
  {
    path:'shop-details-list',
    component:ProductDetailsListComponent,
    title:'Shop Details List Page'
  },
  {
    path:'shop-details-gallery',
    component:ProductDetailsGalleryComponent,
    title:'Shop Details Gallery Page'
  },
  {
    path:'cart',
    component:CartComponent,
    title:'Shop cart Page'
  },
  {
    path:'wishlist',
    component:WishlistComponent,
    title:'Shop Wishlist Page'
  },
  {
    path:'compare',
    component:CompareComponent,
    title:'Shop Compare Page'
  },
  {
    path:'order',
    component:OrderComponent,
    title:'Shop Order Page'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
