import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
// import { environment } from '@env/environment'
import { environment} from '../../../../../environments/environment'
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface count {
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl: string = environment.apiUrl + 'products'

  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: string[]): Observable<Product[]>{
    let params = new HttpParams();
    if(categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.apiUrl, { params: params })
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product)
  }

  updateProduct(product: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product)
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  getProductsCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count`).pipe(map((objectValue: any) => {
      objectValue.productCount
    }))
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured/${count}`)
  }
}
