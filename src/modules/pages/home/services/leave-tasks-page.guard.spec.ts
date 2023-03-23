import { TestBed } from '@angular/core/testing';

import { LeaveTasksPageGuard } from './leave-tasks-page.guard';

describe('LeaveTasksPageGuard', () => {
  let guard: LeaveTasksPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveTasksPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
