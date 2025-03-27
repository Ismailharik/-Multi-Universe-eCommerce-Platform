import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  shoLoding(){
    this.isLoadingSubject.next(true);
  }
  hideLoding(){
    this.isLoadingSubject.next(false);
  } 
  get isLoading(){
    return this.isLoadingSubject.asObservable();
  }
}
