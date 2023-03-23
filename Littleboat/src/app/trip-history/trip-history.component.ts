import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from '../ITrip';
import { FireBaseServiceService } from '../firebaseservice.service';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent {

  trips: Trip[] = [];
  tripsSub: Subscription | undefined
  sum: number;
  chosenOption: string;

  constructor ( private db: FireBaseServiceService, ) {}

  ngOnInit(): void {
    this.tripsSub = this.db.getTrips().subscribe(data => {
      this.trips = []
      this.sum = 0;
      this.chosenOption = '';
      for (let trip of data) {
        if (trip.Bought > 0) {
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

  calculateStatus(trip: Trip): string {
    if (new Date(trip.endDate) < new Date()) return "Archiwalna";
    if (new Date(trip.startDate) > new Date()) return "Oczekiwania na rozpoczęcie";
    return "Aktywna";
  }

  chooseOption(text: string): void {
    this.chosenOption = text;
  }

  filterOption(result: string): string {
    if (this.chosenOption == '') return result;
    return this.chosenOption;
  }
}
