import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})

export class TripRatingComponent {

  @Output() ratingChanged = new EventEmitter<number>();

  @Input() likes = 0;
  @Input() dislikes = 0;

  voted = false;

  changeRating(val: number): void{
    if(this.voted) return
    this.ratingChanged.emit(val)
    this.voted = true
  }
}
