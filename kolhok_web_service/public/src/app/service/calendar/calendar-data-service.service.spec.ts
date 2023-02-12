import { TestBed } from '@angular/core/testing';

import { CalendarDataServiceService } from './calendar-data-service.service';

describe('CalendarDataServiceService', () => {
  let service: CalendarDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
