import { TestBed } from '@angular/core/testing';

import { PairNumbersService } from './pair-numbers.service';

describe('PairNumbersService', () => {
  let service: PairNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PairNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
