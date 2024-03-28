import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userlistGuard } from './userlist.guard';

describe('userlistGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userlistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
