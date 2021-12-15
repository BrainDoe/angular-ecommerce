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

  isValidToken(): boolean | any {
    const token = this.getToken()
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    }else {
      return false;
    }
  }

  private _tokenExpired(expiration: number | any) {
    return Math.floor(new Date().getTime() / 1000) >= expiration
  }

  getUserIdFromToken() {
    const token = this.getToken()
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null
      }
    }else {
      return null;
    }
  }

}
