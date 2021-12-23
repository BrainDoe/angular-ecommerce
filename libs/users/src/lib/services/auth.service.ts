import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { environment} from '../../../../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + 'users'

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private router: Router) { }

  login(loginData: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, loginData)
  }

  logout() {
    this.localStorageService.removeToken()
    this.router.navigate(['/login'])
  }
}
