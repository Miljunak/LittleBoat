import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { HomeComponent } from './home/home.component';
import { TripBasketComponent } from './trip-basket/trip-basket.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { OneTripComponent } from './one-trip/one-trip.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { AdminPermsGuard } from './admin-perms.guard';
import { WrongLinkComponent } from './wrong-link/wrong-link.component';
import { ClientPermsGuard } from './client-perms.guard';
import { ManagerConsoleComponent } from './manager-console/manager-console.component';
import { ManagerPermsGuard } from './manager-perms.guard';

const routes: Routes = [
  {path:'admin',component: AdminConsoleComponent, canActivate: [AdminPermsGuard]},
  {path:'manager',component: ManagerConsoleComponent, canActivate: [ManagerPermsGuard]},
  {path:'login',component: LoginComponent},
  {path:'signup',component: SignUpComponent},
  {path:'history',component: TripHistoryComponent, canActivate: [ClientPermsGuard]},
  {path:'trip-list',component: TripListComponent},
  {path:'add-trip',component: TripFormComponent},
  {path:'cart',component: TripBasketComponent, canActivate: [ClientPermsGuard]},
  {path:'trip-list/:id',component: OneTripComponent, canActivate: [ClientPermsGuard]},
  {path:'',component: HomeComponent},
  {path:'**',component: WrongLinkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
