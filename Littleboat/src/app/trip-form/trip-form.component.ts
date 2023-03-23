import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../ITrip';
import { FireBaseServiceService } from '../firebaseservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})

export class TripFormComponent {

  incorrectForm: boolean = false;
  res: number;
  tripsSub: Subscription | undefined

  constructor(private db: FireBaseServiceService) {
    this.tripsSub = this.db.getTrips().subscribe(data => {
      this.res = data.length;
    })
  }

  tripForm = new FormGroup({
    tripName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    tripCountry: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    tripStartDate: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[1-9]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')
    ]),
    tripEndDate: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[1-9]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')
    ]),
    tripPrice: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.pattern('[0-9]+.[0-9]+')
    ]),
    tripMax: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]+')
    ]),
    tripDesc: new FormControl('', [
      Validators.required,
      Validators.min(3)
    ]),
    tripImage: new FormControl('', [
      Validators.required,
      Validators.min(3)
    ]),
  });

  updateData(): void {
    if (!this.tripForm.valid) {
      this.incorrectForm = true;
      return;
    }
    const newTrip = {
      id: this.res + 1,
      name: this.tripForm.get('tripName')!.value,
      country: this.tripForm.get('tripCountry')!.value,
      startDate: this.tripForm.get('tripStartDate')!.value,
      endDate: this.tripForm.get('tripEndDate')!.value,
      desc: this.tripForm.get('tripDesc')!.value,
      imageLink: this.tripForm.get('tripImage')!.value,
      maxAmount: Number(this.tripForm.get('tripMax')!.value),
      price: Number(this.tripForm.get("tripPrice")!.value),
      amount: 0,
      likes: 0,
      dislikes: 0,
      bought: 0,
    } as Trip;
    this.db.addTrip(newTrip);
    this.tripForm.reset();
    this.incorrectForm = false;
  }
}