import { TestBed } from '@angular/core/testing';

import { ClientPermsGuard } from './client-perms.guard';

describe('ClientPermsGuard', () => {
  let guard: ClientPermsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientPermsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
