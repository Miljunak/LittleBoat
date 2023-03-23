import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientPermsGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.userRoles.client) return true;
      alert("Jezeli chcesz poznac szczegoly stworz konto badz zaloguj sie.");
      this.router.navigate(['/trip-list']);
      return false;
    }
  
}
