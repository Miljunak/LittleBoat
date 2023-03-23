import { TestBed } from '@angular/core/testing';

import { ManagerPermsGuard } from './manager-perms.guard';

describe('ManagerPermsGuard', () => {
  let guard: ManagerPermsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerPermsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
