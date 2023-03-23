import { Component } from '@angular/core';
import { FireBaseServiceService } from '../firebaseservice.service';
import { AuthService } from '../auth.service';
import { User } from '../IUser';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent {

  users: User[] = [];
  usersSub: Subscription | undefined;

  constructor(private db: FireBaseServiceService, public auth: AuthService) {
    this.usersSub = this.db.getUsers().subscribe((users) => {
      this.users = [];
      for (let userData of users) {
        let user = new User(userData.payload.val());
        user.uid = userData.payload.key;
        this.users.push(user);
      }
    });
  }

  adminUser(uid: string, status: boolean) {
    this.db.changeUserRole(uid, 'admin', String(status));
  }

  managerUser(uid: string, status: boolean) {
    this.db.changeUserRole(uid, 'manager', String(status));
  }

  clientUser(uid: string, status: boolean) {
    this.db.changeUserRole(uid, 'client', String(status));
  }

  banUser(uid: string, status: boolean) {
    this.db.changeUserRole(uid, 'banned', String(status));
  }
}
