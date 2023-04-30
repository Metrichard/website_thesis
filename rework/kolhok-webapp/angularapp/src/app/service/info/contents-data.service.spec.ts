import { TestBed } from '@angular/core/testing';

import { ContentsDataService } from './contents-data.service';

describe('ContentsDataService', () => {
  let service: ContentsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
