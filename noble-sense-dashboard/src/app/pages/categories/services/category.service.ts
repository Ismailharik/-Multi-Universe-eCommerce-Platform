import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { CategoryPage } from 'src/app/models/categoryPage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  deleteImage(id: number, url: string):Observable<ICategory> {
    const params = new HttpParams()
    .set('imageUrl', url)
    return this.http.delete<ICategory>(`${this.apiBaseUrl}/${id}/images`,{params})
  }
  private apiBaseUrl = environment.host + '/api/v1/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(page: number = 0, size: number = 10): Observable<CategoryPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<CategoryPage>(this.apiBaseUrl, { params });
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiBaseUrl}/${categoryId}`);
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiBaseUrl, category);
  }

  updateCategory(categoryId: number, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiBaseUrl}/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${categoryId}`);
  }
  addImageToCategory(categoryId: number, imageFile: File): Observable<ICategory> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<ICategory>(`${this.apiBaseUrl}/${categoryId}/images`, formData);
  }

  deleteImageFromCategory(categoryId: number, imageUrl: string): Observable<ICategory> {
    const params = new HttpParams().set('imageUrl', imageUrl);

    return this.http.delete<ICategory>(`${this.apiBaseUrl}/${categoryId}/images`, { params });
  }
}