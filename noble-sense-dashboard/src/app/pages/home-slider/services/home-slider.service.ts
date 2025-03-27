import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeSlider } from 'src/app/models/homeSlider.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {
  private apiUrl =environment.host+ '/api/v1/homesliders';

  constructor(private http: HttpClient) { }


  createHomeSlider(homeSlider: HomeSlider): Observable<HomeSlider> {
    return this.http.post<HomeSlider>(this.apiUrl, homeSlider);
  }

  // Get all HomeSliders
  getAllHomeSliders(): Observable<HomeSlider[]> {
    return this.http.get<HomeSlider[]>(this.apiUrl);
  }

  // Get a HomeSlider by ID
  getHomeSliderById(id: number): Observable<HomeSlider> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<HomeSlider>(url);
  }

  // Update a HomeSlider
  updateHomeSlider(id: number, homeSlider: HomeSlider): Observable<HomeSlider> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<HomeSlider>(url, homeSlider);
  }

  // Delete a HomeSlider
  deleteHomeSlider(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  addImageToHomeSlider(homeSliderId: number, imageFile: File): Observable<HomeSlider> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile);
    console.log(formData)
    console.log(`${this.apiUrl}/${homeSliderId}/images` )
    return this.http.post<HomeSlider>(`${this.apiUrl}/${homeSliderId}/images`, formData);
  }

  deleteImageFromHomeSlider(homeSliderId: number, imageUrl: string): Observable<HomeSlider> {
    const params = new HttpParams().set('imageUrl', imageUrl);
    return this.http.delete<HomeSlider>(`${this.apiUrl}/${homeSliderId}/images`, { params });
  }
  addBackgroundImageToHomeSlider(homeSliderId: number, imageFile: File): Observable<HomeSlider> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile);
    return this.http.post<HomeSlider>(`${this.apiUrl}/${homeSliderId}/backgroundImage`, formData);
  }
}
