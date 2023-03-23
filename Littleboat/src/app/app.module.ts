import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MyFilterPipe } from './pipes/myfilter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment';

import { TripListComponent } from './trip-list/trip-list.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripBasketComponent } from './trip-basket/trip-basket.component';
import { TripFilterComponent } from './trip-filter/trip-filter.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OneTripComponent } from './one-trip/one-trip.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { WrongLinkComponent } from './wrong-link/wrong-link.component';
import { ManagerConsoleComponent } from './manager-console/manager-console.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripFormComponent,
    TripRatingComponent,
    TripBasketComponent,
    TripFilterComponent,
    MyFilterPipe,
    HomeComponent,
    NavbarComponent,
    TripHistoryComponent,
    OneTripComponent,
    SignUpComponent,
    LoginComponent,
    AdminConsoleComponent,
    WrongLinkComponent,
    ManagerConsoleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
