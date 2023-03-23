import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FireBaseServiceService } from '../firebaseservice.service';
import { Trip } from '../ITrip';

@Component({
  selector: 'app-manager-console',
  templateUrl: './manager-console.component.html',
  styleUrls: ['./manager-console.component.css']
})
export class ManagerConsoleComponent {

  trips: Trip[] = [];
  tripsSub: Subscription | undefined
  res: number;

  constructor(private db: FireBaseServiceService, public auth: AuthService) { 
    this.tripsSub = this.db.getTrips().subscribe(data => {
      this.trips = []
      this.res = data.length;
      for (let trip of data) {
        this.trips.push({
          id: trip.id,
          name: trip.Name,
          country: trip.Country,
          startDate: trip.StartDate,
          maxAmount: trip.MaxAmount,
          price: trip.Price,
          desc: trip.Desc,
          imageLink: trip.ImageLink,
          endDate: trip.EndDate,
          likes: trip.Likes,
          dislikes: trip.Dislikes,
          amount: trip.Amount,
          bought: trip.Bought,
        } as Trip);
      }
    });
  }

  deleteTrip(trip: Trip): void {
    this.db.removeTrip(trip.id);
  }

  modForm = new FormGroup({
    tripName: new FormControl('', [
      Validators.minLength(3)
    ]),
    tripCountry: new FormControl('', [
      Validators.minLength(3)
    ]),
    tripStartDate: new FormControl('', [
      Validators.minLength(3),
      Validators.pattern('[1-9]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')
    ]),
    tripEndDate: new FormControl('', [
      Validators.minLength(3),
      Validators.pattern('[1-9]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')
    ]),
    tripPrice: new FormControl('', [
      Validators.min(3),
      Validators.pattern('[0-9]+.[0-9]+')
    ]),
    tripMax: new FormControl('', [
      Validators.min(1),
      Validators.pattern('[0-9]+')
    ]),
    tripDesc: new FormControl('', [
      Validators.min(3)
    ]),
    tripImage: new FormControl('', [
      Validators.min(3)
    ]),
  });

  updateData(currTrip: Trip): void {
    if (!this.modForm.valid) {
      alert("Upewnij sie ze daty sa w formacie YYYY-MM-DD oraz ze wprowadzone dane maja conajmnej 3 znaki!");
      return;
    }
    const newTrip = {
      id: currTrip.id,
      name: this.modForm.get('tripName')!.value,
      country: this.modForm.get('tripCountry')!.value,
      startDate: this.modForm.get('tripStartDate')!.value,
      endDate: this.modForm.get('tripEndDate')!.value,
      desc: this.modForm.get('tripDesc')!.value,
      imageLink: this.modForm.get('tripImage')!.value,
      maxAmount: Number(this.modForm.get('tripMax')!.value),
      price: Number(this.modForm.get("tripPrice")!.value),
      amount: currTrip.amount,
      likes: currTrip.likes,
      dislikes: currTrip.dislikes,
      bought: currTrip.bought,
    } as Trip;
    //console.log(newTrip);
    
    if (newTrip.name != "" && newTrip.name != null) this.db.updateName(currTrip.id, newTrip.name);
    if (newTrip.country != "" && newTrip.country != null) this.db.updateCountry(currTrip.id, newTrip.country);
    if (newTrip.startDate != "" && newTrip.startDate != null) this.db.updateDateS(currTrip.id, newTrip.startDate);
    if (newTrip.endDate != "" && newTrip.endDate != null) this.db.updateDateE(currTrip.id, newTrip.endDate);
    if (newTrip.desc != "" && newTrip.desc != null) this.db.updateDesc(currTrip.id, newTrip.desc);
    if (newTrip.imageLink != "" && newTrip.imageLink != null) this.db.updateLink(currTrip.id, newTrip.imageLink);
    if (newTrip.maxAmount != 0) this.db.updateMax(currTrip.id, newTrip.maxAmount);
    if (newTrip.price != 0) this.db.updatePrice(currTrip.id, newTrip.price);
    
    this.modForm.reset();
    //this.incorrectForm = false;
  }

}
