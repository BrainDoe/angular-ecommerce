import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.localStorage.getToken()
    
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]))
      if(tokenDecode.isAdmin && !this.tokenExpired(tokenDecode.exp)) return true
    }

    this.router.navigate(['/login'])
    return false
  }

  private tokenExpired(tokenExp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= tokenExp
  }
}
