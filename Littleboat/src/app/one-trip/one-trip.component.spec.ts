import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTripComponent } from './one-trip.component';

describe('OneTripComponent', () => {
  let component: OneTripComponent;
  let fixture: ComponentFixture<OneTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
