import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '@/types/product-type';


const state = {
  compare_items: JSON.parse(localStorage['compare_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})


export class CompareService {

  public getCompareProducts () {
    return state.compare_items;
  }

  constructor(private toastrService: ToastrService) { }

  // add_compare_product
  add_compare_product (payload: IProduct) {
    const isAdded = state.compare_items.findIndex((p: IProduct) => p.id === payload.id);
    if (isAdded !== -1) {
      state.compare_items = state.compare_items.filter((p: IProduct) => p.id !== payload.id);
      this.toastrService.error(`${payload.title} remove to compare`);
    } else {
      state.compare_items.push(payload);
      this.toastrService.success(`${payload.title} added to compare`);
    }
    localStorage.setItem("compare_products", JSON.stringify(state.compare_items));
  };
  // remove compare
  removeCompare(payload: IProduct) {
    state.compare_items = state.compare_items.filter((p: IProduct) => p.id !== payload.id);
    this.toastrService.error(`${payload.title} remove to compare`);
    localStorage.setItem("compare_products", JSON.stringify(state.compare_items));
  };
}
