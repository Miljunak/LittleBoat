import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from '../ITrip';
import { FireBaseServiceService } from '../firebaseservice.service';

@Component({
  selector: 'app-trip-basket',
  templateUrl: './trip-basket.component.html',
  styleUrls: ['./trip-basket.component.css']
})
export class TripBasketComponent {

  trips: Trip[] = [];
  tripsSub: Subscription | undefined
  sum: number;

  constructor ( private db: FireBaseServiceService, ) {}

  ngOnInit(): void {
    this.tripsSub = this.db.getTrips().subscribe(data => {
      this.trips = []
      this.sum = 0;
      for (let trip of data) {
        if (trip.Amount > 0) {
          this.sum += trip.Amount * trip.Price;
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
      }
      this.sum = Math.round(this.sum * 100) / 100;
    });
  }

  soon(trip: Trip): boolean {
    const dateA = new Date(trip.startDate);
    const dateB = new Date();
    const dateC = new Date();
    dateC.setDate(dateB.getDate() + 14);
    return dateA > dateB && dateA < dateC;
  }

  buyTrip(trip: Trip): void {
    this.db.updateBought(trip.id, trip.amount + trip.bought);
    this.db.updateMax(trip.id, trip.maxAmount - trip.amount);
    this.db.updateAmount(trip.id, 0);
  }
}

