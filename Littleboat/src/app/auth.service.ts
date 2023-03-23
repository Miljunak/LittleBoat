import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FireBaseServiceService } from './firebaseservice.service';
import { Roles, User } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;
  userEmail: string;
  userRoles: Roles = {
    guest: true,
    admin: false,
    manager: false,
    client: false,
    banned: false,
  };

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private db: FireBaseServiceService,
  ) {
    auth.authState.subscribe(async (authStateValue: any) => {
      if (authStateValue) {
        this.userData = authStateValue;
        this.userRoles = await this.db.getRoles(this.userData.uid) as Roles;
        this.userEmail = await this.db.getMail(this.userData.uid) as string;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          manager: false,
          client: false,
          banned: false,
        };
      }
    });
  }

  async login(email: string, password: string) {
    try {
      this.auth.signInWithEmailAndPassword(email, password);
      this.userData = this.getCurrentUserData();
      this.userEmail = email;
      this.router.navigate(['']);
    } catch (error) { window.alert(error); }
  }

  async register(email: string, password: string) {
    try {
      const data = await this.auth.createUserWithEmailAndPassword(email, password);
      let userData = new User(data.user);
      this.db.addUser(userData);
      this.router.navigate(['']);
    } catch (errorr) { window.alert(errorr); }
  }

  async signOut() {
    this.auth.signOut();
    this.userData = null;
    this.userEmail = "";
    this.router.navigate(['']);
  }

  getCurrentUserData() {
    return this.auth.currentUser;
  }

  isLoggedIn() {
    return this.userData != null;
  }

}
