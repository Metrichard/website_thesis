import { TestBed } from '@angular/core/testing';

import { PresidencyDataService } from './presidency-data.service';

describe('PresidencyDataService', () => {
  let service: PresidencyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresidencyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
