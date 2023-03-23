import { TestBed } from '@angular/core/testing';

import { AdminPermsGuard } from './admin-perms.guard';

describe('AdminPermsGuard', () => {
  let guard: AdminPermsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPermsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
