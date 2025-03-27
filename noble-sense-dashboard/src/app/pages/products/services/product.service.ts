import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductPage } from 'src/app/models/productPage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //may later I will use customer instead of user 
  private apiUrl = environment.host + "/api/v1/products";
  constructor(private http: HttpClient) { }


  findAllProducts(page: number, size: number): Observable<ProductPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ProductPage>(this.apiUrl, { params })
  }
  findProductsByCategory(categoryId: number, page: number, size: number): Observable<ProductPage> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<ProductPage>(`${this.apiUrl}/byCategory/${categoryId}`,{params})
  }

  // findAllProductByKeyword(page:number,size:number):Observable<ProductPage>{
  //   const params = new HttpParams()
  //   .set('page', page.toString())
  //   .set('size', size.toString());
  //   return this.http.get<ProductPage>(this.apiUrl,{params})
  // }
  findProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${productId}`)
  }
  updateProduct(productId: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${productId}`, product);
  }
  addProdcut(product: IProduct,categoryId:number): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/${categoryId}`, product);
  }
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`)
  }
  addImageToProduct(productId: number, file: File): Observable<IProduct> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    // Add any additional headers if required

    return this.http.post<IProduct>(
      `${this.apiUrl}/${productId}/images`,
      formData,
      { headers }
    );
  }

  deleteImage(productId: number, imageUrl: string): Observable<void> {
    const params = new HttpParams()
      .set('imageUrl', imageUrl)
    return this.http.delete<void>(`${this.apiUrl}/${productId}/images`, { params })
  }

}
