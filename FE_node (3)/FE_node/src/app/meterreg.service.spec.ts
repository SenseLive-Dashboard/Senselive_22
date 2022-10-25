import { TestBed } from '@angular/core/testing';

import { MeterregService } from './meterreg.service';

describe('MeterregService', () => {
  let service: MeterregService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeterregService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
