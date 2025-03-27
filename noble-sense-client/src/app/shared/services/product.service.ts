import { IProduct, ProductPage } from '@/types/product-type';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import product_data from '@/data/product-data';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const all_products = product_data;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public filter_offcanvas: boolean = false;
  // Get Products
  public get products(): Observable<IProduct[]> {
    return of(product_data);
  }

  constructor(private http: HttpClient) {}

  activeImg: string | undefined;

  handleImageActive(img: string) {
    this.activeImg = img;
  }  

  // Get Products By id
  
  // Get related Products
  public getRelatedProducts(
    productId: number,
    category: string
  ): Observable<IProduct[]> {
    return this.products.pipe(
      map((items) => {
        return items.filter(
          (p) =>
            p.parent.toLowerCase() === category.toLowerCase() &&
            p.id !== productId
        );
      })
    );
  }
  // Get max price
  public get maxPrice(): number {
    const max_price = all_products.reduce((max, product) => {
      return product.price > max ? product.price : max;
    }, 0);
    // return max_price;
    return 2000;
  }
  // shop filterSelect
  public filterSelect = [
    { value: '', text: 'Default Sorting' },
    { value: 'price', text: 'Price' },
    { value: 'discount', text: 'Discount' },
    { value: 'sellCount', text: 'Sell Count' },
  ];



  // Sorting Filter
  public sortProducts(products: IProduct[], payload: string): any {
    if (payload === 'asc') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    } else if (payload === 'on-sale') {
      return products.filter((p) => p.discount > 0);
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    }
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 9
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  /*
   
  */

  private apiUrl = environment.host + '/api/v1/products';


  // get ProductById
  getProductById(id: number): Observable<IProduct | undefined> {
    return this.http.get<IProduct>(this.apiUrl + '/' + id);
  }
  // get new Product
  getTrandingProducts(
    activeTab: string,
    parent: string
  ): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      this.apiUrl + '/' + activeTab + '/' + parent
    );
  }
  getLimitedOfferProducts(parent: string) {
    return this.http.get<IProduct[]>(this.apiUrl + '/limited-offers/' + parent);
  }

  // get top 3 selling products
  getTop3BestSellingProducts(parent: string) {
    return this.http.get<IProduct[]>(this.apiUrl + '/best-selling-top3/' + parent);
  }
  //get top 3 featured products
  getTop3FeaturedProducts(parent: string) {
    return this.http.get<IProduct[]>(this.apiUrl + '/featured-top3/' + parent);
  }
  // get top 3 discounted products 
  getTop3DiscountedProducts(parent: string) {
    return this.http.get<IProduct[]>(this.apiUrl + '/discount-top3/' + parent);
  }
    // Get Product Filter
    filterProducts(categoryId: number, status: string|null, minPrice: number, maxPrice: number, pageNo: number, sortBy: string) {
      let queryParams = `minPrice=${minPrice}&maxPrice=${maxPrice}&pageNo=${pageNo}&sortBy=${sortBy}`;
    
      if (categoryId!=0) {
        queryParams = `categoryId=${categoryId}&${queryParams}`;
      }
      if (status) {
        queryParams = `status=${status}&${queryParams}`;
      }
    
      return this.http.get<ProductPage>(`${this.apiUrl}/filter?${queryParams}`);
    }

    // for menu on header page 
    getProductsByCategory(categoryId: number): Observable<ProductPage> {
      return this.http.get<ProductPage>(`${this.apiUrl}/byCategory/${categoryId}`);
    }

}
