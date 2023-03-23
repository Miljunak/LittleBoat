import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css']
})

export class TripFilterComponent {

  @Output() msgCountry = new EventEmitter<any>();
  @Output() msgDate = new EventEmitter<any>();
  @Output() msgPrice = new EventEmitter<any>();

  @Input() tripList: any[];

  chosenCountry: string;
  chosenStartDate: string = "1000-01-01";
  chosenEndDate: string = "9001-01-01";
  chosenPriceLower: string = "0";
  chosenPriceHigher: string = "999999999";

  priceTester(): boolean {
    if(this.chosenPriceLower == "") this.chosenPriceLower = "0";
    if(this.chosenPriceHigher == "") this.chosenPriceHigher = "999999999";
    return parseInt(this.chosenPriceLower) > parseInt(this.chosenPriceHigher);
  }

  dateTester(): boolean {
    if(this.chosenStartDate == "") this.chosenStartDate = "1000-01-01";
    if(this.chosenEndDate == "") this.chosenEndDate = "9001-01-01";
    const dateA = new Date(this.chosenStartDate);
    const dateB = new Date(this.chosenEndDate);
    //console.log(dateA, dateB);
    return dateA > dateB;
  }

  countryChanged(): void {
    this.msgCountry.emit(this.chosenCountry);
  }

  datesChanged(): void {
    //console.log(this.chosenStartDate);
    if (!this.dateTester()) {
      let dates: string[] = [this.chosenStartDate, this.chosenEndDate];
      this.msgDate.emit(dates);
  }}

  pricesChanged(): void {
    if (!this.priceTester()) {
      let prices: number[] = [parseInt(this.chosenPriceLower), parseInt(this.chosenPriceHigher)];
      this.msgPrice.emit(prices);
    }
  }
  
}
