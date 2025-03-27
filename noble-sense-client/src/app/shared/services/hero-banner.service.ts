import { IHomeSlider } from '@/types/homeSlider-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HeroBannerService {
  private ApiUrl = environment.host + '/api/v1/homesliders';

  constructor(private http:HttpClient) { }

  getHeroBanner():Observable<IHomeSlider[]> {
    return this.http.get<IHomeSlider[]>(this.ApiUrl);
  }

}
