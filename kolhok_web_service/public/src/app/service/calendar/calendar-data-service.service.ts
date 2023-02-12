import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { DateEvent } from 'app/calendar/calendar.component';

@Injectable({
  providedIn: 'root'
})
export class CalendarDataServiceService {

  constructor(
    private http: HttpClient
  ) { }
  
  retrieveAllEvents() {
    return this.http.get<DateEvent[]>(`${API_URL}/api/calendar-get-all`);
  }

  createDateEvent(dateEvent: DateEvent) {
    return this.http.post<DateEvent>(`${API_URL}/api/calendar-create`, dateEvent);
  }

  updateDateEvent(dateEvent: DateEvent) {
    return this.http.post<DateEvent>(`${API_URL}/api/calendar-update`, dateEvent);
  }

  deleteDateEvent(id: String) {
    return this.http.delete(`${API_URL}/api/calendar-delete/${id}`);
  }
}
