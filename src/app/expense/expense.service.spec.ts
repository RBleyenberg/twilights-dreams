import { TestBed, inject } from '@angular/core/testing';

import { ExpenseService } from './expence.service';

describe('ExpenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseService]
    });
  });

  it('should be created', inject([ExpenseService], (service: ExpenseService) => {
    expect(service).toBeTruthy();
  }));
});
