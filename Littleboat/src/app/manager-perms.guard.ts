import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerPermsGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.userRoles.manager) return true;
      console.log('NOT MANAGER');
      this.router.navigate(['']);
      return false;
    }
  
}