import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { environment } from '@env/environment'
import { environment} from '../../../../../environments/environment'
import { User } from '@meerev/users'
import { Observable } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';
declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = environment.apiUrl + 'users'

  constructor(private http: HttpClient) {  }

  getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json')); 
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
  }

  getUser(id: User): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
