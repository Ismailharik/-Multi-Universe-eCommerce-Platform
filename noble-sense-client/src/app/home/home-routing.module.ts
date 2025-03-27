import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoodUniverseComponent } from './food-universe/food-universe.component';
import { BeautyComponent } from './beauty/beauty.component';

const routes: Routes = [
  {
    path:'food-universe',
    component:FoodUniverseComponent,
    title:'Noble Sense - Food Universe'
  },
  {
    path:'wooden-houses-universe',
    component:BeautyComponent,
    title:'Home Beauty'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
