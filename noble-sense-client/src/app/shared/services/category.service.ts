import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '@/types/category-type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.host+'/api/v1/categories'; 

  constructor(private http: HttpClient) { }


  getCategoryById(categoryId: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/${categoryId}`);
  }

  addCategory(categoryDTO: any): Observable<any> {
    return this.http.post(this.baseUrl, categoryDTO);
  }

  updateCategory(categoryId: number, categoryDTO: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${categoryId}`, categoryDTO);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${categoryId}`);
  }

  addImageToCategory(categoryId: number, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile);
    return this.http.post(`${this.baseUrl}/${categoryId}/images`, formData);
  }

  deleteImageFromCategory(categoryId: number, imageUrl: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${categoryId}/images?imageUrl=${imageUrl}`);
  }
  getCategoriesByParent(parent: string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/parent/${parent}`);
  }

}