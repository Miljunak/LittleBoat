import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongLinkComponent } from './wrong-link.component';

describe('WrongLinkComponent', () => {
  let component: WrongLinkComponent;
  let fixture: ComponentFixture<WrongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
