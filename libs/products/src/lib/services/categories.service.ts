import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { environment } from '@env/environment'
import { environment} from '../../../../../environments/environment'
import { Category } from './../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl: string = environment.apiUrl + 'categories'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl)
  }

  getCategory(id: Category): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category)
  }

  deleteCategories(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
