import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPermsGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.userRoles.admin) return true;
      console.log('NOT ADMIN');
      this.router.navigate(['']);
      return false;
    }
  
}
