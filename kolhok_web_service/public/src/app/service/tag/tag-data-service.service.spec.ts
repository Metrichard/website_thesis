import { TestBed } from '@angular/core/testing';

import { TagDataService } from './tag-data-service.service';

describe('TagDataServiceService', () => {
  let service: TagDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
