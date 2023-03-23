import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Trip } from './ITrip';
import { User } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class FireBaseServiceService {

  trips: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { 
    this.trips = this.db.list('Trips').valueChanges();
  }

  getTrips(): Observable<any[]> {
    return this.trips
  }

  addTrip(trip: Trip): void {
    this.db.list('Trips').push({
      id: trip.id,
      Name: trip.name,
      Country: trip.country,
      StartDate: trip.startDate,
      MaxAmount: trip.maxAmount,
      Price: trip.price,
      ShortDesc: trip.desc,
      ImageLink: trip.imageLink,
      EndDate: trip.endDate,
      Likes: trip.likes,
      Dislikes: trip.dislikes,
      Amount: trip.amount,
      Bought: trip.bought,
    })
  }

  removeTrip(idx: number): void {
    console.log(idx)
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items) {
        if(item.payload.val().id == idx) {
          this.db.list('Trips').remove(item.payload.key);
          return;
        }
      }
    })
  }
  
  updateAmount(idx: number, amount: number): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {Amount: amount});
          return;
        }
      }
    })
  }

  updateName(idx: number, newName: string): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {Name: newName});
          return;
        }
      }
    })
  }

  updateCountry(idx: number, newCountry: string): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {Country: newCountry});
          return;
        }
      }
    })
  }

  updateDesc(idx: number, desc: string): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {ShortDesc: desc});
          return;
        }
      }
    })
  }

  updateDateS(idx: number, dateStart: string): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {StartDate: dateStart});
          return;
        }
      }
    })
  }

  updateDateE(idx: number, dateEnd: string): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {EndDate: dateEnd});
          return;
        }
      }
    })
  }

  updatePrice(idx: number, price: number): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {Price: price});
          return;
        }
      }
    })
  }

  updateLink(idx: number, link: string): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {ImageLink: link});
          return;
        }
      }
    })
  }

  updateMax(idx: number, max: number): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {MaxAmount: max});
          return;
        }
      }
    })
  }

  updateBought(idx: number, boughtAmount: number): void {
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let item of items){
        if(item.payload.val().id == idx) {
          this.db.list('Trips').update(item.payload.key, {Bought: boughtAmount});
          return;
        }
      }
    })
  }

  addUser(user: User) {
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
    });
  }

  async getMail(uid: string) {
    return firstValueFrom(this.db.object('/users/' + uid + '/email').valueChanges());
  }

  async getRoles(uid: string) {
    return firstValueFrom(this.db.object('/users/' + uid + '/roles').valueChanges());
  }

  getUsers(): Observable<any> {
    return this.db.list('users').snapshotChanges();
  }

  changeUserRole(uid: string, role: string, value: string) {
    this.db.object('/users/' + uid + '/roles').update(JSON.parse('{"' + role + '"' + ':' + value + '}'));
  }
}
