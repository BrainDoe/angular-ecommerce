import { Injectable } from '@angular/core';

const token = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem(token, data)
  }

  getToken(): any {
    return localStorage.getItem(token)
  }

  removeToken() {
    localStorage.removeItem(token)
  }
}
