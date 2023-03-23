import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { FireBaseServiceService } from '../firebaseservice.service';
import { Trip } from '../ITrip';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-one-trip',
  templateUrl: './one-trip.component.html',
  styleUrls: ['./one-trip.component.css']
})
export class OneTripComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private db: FireBaseServiceService,
    public auth: AuthService, 
  ){  }

  tripsSub: Subscription | undefined;
  
  id: number = -1;
  currTrip: Trip;

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = params['id'] });
    this.tripsSub = this.db.getTrips().subscribe(data => {
      for (let trip of data) {
        if (trip.id == this.id) {
          this.currTrip = {
            id: trip.id,
            name: trip.Name,
            country: trip.Country,
            startDate: trip.StartDate,
            maxAmount: trip.MaxAmount,
            price: trip.Price,
            desc: trip.ShortDesc,
            imageLink: trip.ImageLink,
            endDate: trip.EndDate,
            likes: trip.Likes,
            dislikes: trip.Dislikes,
            amount: trip.Amount,
            bought: trip.Bought,
          };
          return;
      }}
    });
  }

  ratingEventHandler(trip: Trip, x: number): void {
    if (x == 1) trip.likes += 1
    else trip.dislikes += 1
  }

  addTrip(trip: Trip): void {
    trip.amount++;
    this.db.updateAmount(trip.id, trip.amount);
  }

  removeTrip(trip: Trip): void {
    trip.amount--;
    this.db.updateAmount(trip.id, trip.amount);
  }

  deleteTrip(): void {
    this.db.removeTrip(this.currTrip.id);
  }

  review = new FormGroup({
    mainReview: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500)
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    tripName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    tripDate: new FormControl('', [
      Validators.pattern('[1-9]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')
    ]),
  });
}
