import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import {  FoodUniverseComponent } from './food-universe/food-universe.component';

import { ShopModule } from './../shop/shop.module';
import { BeautyComponent } from './beauty/beauty.component';


@NgModule({
  declarations: [
    FoodUniverseComponent,
    BeautyComponent,

  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    CommonModule,
    ShopModule,
  ]
})
export class HomeModule { }
