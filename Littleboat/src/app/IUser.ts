export interface Roles {
  admin: boolean;
  manager: boolean;
  client: boolean;
  guest: boolean;
  banned: boolean;
}
  
export class User {
  email: string;
  roles: Roles;
  uid: string;
  
  constructor(user: any) {
    this.email = user.email;
    this.uid = user.uid;
    if (user.roles != null) this.roles = user.roles;
    else
      this.roles = {
        admin: false,
        manager: false,
        client: true,
        guest: false,
        banned: false,
      };
    }
  }