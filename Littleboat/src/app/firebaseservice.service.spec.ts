import { TestBed } from '@angular/core/testing';

import { FireBaseServiceService } from './firebaseservice.service';

describe('FirebaseServiceService', () => {
  let service: FireBaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireBaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
