import { TestBed } from '@angular/core/testing';

import { DocumentDataService } from './document-data.service';

describe('DocumentDataService', () => {
  let service: DocumentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
