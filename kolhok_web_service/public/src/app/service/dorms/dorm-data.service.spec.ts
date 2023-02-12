import { TestBed } from '@angular/core/testing';

import { DormDataService } from './dorm-data.service';

describe('DormDataService', () => {
  let service: DormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
