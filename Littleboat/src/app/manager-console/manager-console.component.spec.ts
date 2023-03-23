import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerConsoleComponent } from './manager-console.component';

describe('ManagerConsoleComponent', () => {
  let component: ManagerConsoleComponent;
  let fixture: ComponentFixture<ManagerConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
