import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from '../ITrip';
import { FireBaseServiceService } from '../firebaseservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent implements OnInit {

  trips: Trip[] = [];
  tripsSub: Subscription | undefined
  res: number;

  filtertags: Trip = {
    id: 1,
    name: "",
    country: "",
    startDate: "1000-01-01",
    endDate: "9001-01-01",
    price: 0,
    //maxAmount jest wykorzystane jako gorna granica price.
    maxAmount: 999999999,
    desc: "",
    imageLink: "",
    amount: 0,
    likes: 0,
    dislikes: 0,
    bought: 0,
  }

  constructor(private db: FireBaseServiceService, public auth: AuthService) { }

  ngOnInit(): void {
    this.tripsSub = this.db.getTrips().subscribe(data => {
      this.trips = []
      this.res = data.length;
      for (let trip of data) {
        //console.log(trip.Name);
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
    //console.log("endgame");
    //console.log(this.trips);
  }

  addTrip(trip: Trip): void {
    trip.amount++;
    this.db.updateAmount(trip.id, trip.amount);
    //console.log(this.db.getUsers());
  }

  removeTrip(trip: Trip): void {
    trip.amount--;
    this.db.updateAmount(trip.id, trip.amount);
    //console.log(this.cartSum);
  }

  calculateExpensive(trips: Trip[]): number {
    if (this.filtertags.maxAmount != 999999999) return this.filtertags.maxAmount - 0.01;
    let maxPricedTrip = trips[0];
    for (let trip of trips) {
      if (trip.price > maxPricedTrip.price) maxPricedTrip = trip;
    }
    return maxPricedTrip.price;
  }
  
  calculateCheapest(trips: Trip[]): number {
    if (this.filtertags.price != 0) return this.filtertags.price + 0.99;
    let minPricedTrip = trips[0];
    for (let trip of trips) {
      if (trip.price < minPricedTrip.price) minPricedTrip = trip;
    }
    return minPricedTrip.price;
  }

  calculateSum(trips: Trip[]): number {
    let sigma = 0;
    for (let trip of trips) sigma += trip.amount;
    return sigma;
  }

  calculateMoneySum(trips: Trip[]): number{
    let sigma = 0;
    for (let trip of trips) sigma += trip.amount*trip.price;
    //console.log(sigma);
    return Math.round(sigma * 100) / 100;
  }

  deleteTrip(trip: Trip): void {
    for (var i = 0; i < this.trips.length; i++) {
      if (this.trips[i] == trip) {
        this.db.removeTrip(trip.id);
      }
    }
  }

  ratingEventHandler(trip: Trip, x: number): void {
    if (x == 1) trip.likes += 1
    else trip.dislikes += 1
  }

  countryEventHandler(s: string): void {
    this.filtertags.country = s;
  }
  
  dateEventHandler(dates: string[]): void {
    this.filtertags.startDate = dates[0];
    this.filtertags.endDate = dates[1];
    //console.log(this.dateBoundedHigh);
  }

  priceEventHandler(prices: number[]): void {
    this.filtertags.price = prices[0];
    this.filtertags.maxAmount = prices[1] + 1;
    //console.log(this.priceBoundedHigh);
  }

}
