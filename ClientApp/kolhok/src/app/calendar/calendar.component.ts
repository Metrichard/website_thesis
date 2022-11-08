import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { CalendarDataServiceService } from 'app/service/calendar/calendar-data-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  newEvent: DateEvent = new DateEvent('-1','','','');

  events?: any[];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateEvent.bind(this),
    events: this.events,
  };

  constructor(
    private calendarDataService: CalendarDataServiceService,
    public authService: JwtAuthenticationService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initCalendar();
  }

  initCalendar() {
    this.calendarDataService.retrieveAllEvents().subscribe(
      response => {
        this.events = response
      }
    )
  }

  handleDateEvent(arg:any) {
    //alert('date click' + arg.dateStr);
  }

  createEvent() {
    this.calendarDataService.createDateEvent(this.newEvent).subscribe(
      data => {
        window.location.reload();
      }
    )
  }
}

export class DateEvent {

  constructor(
    public id: String,
    public title: String,
    public date: String,
    public color: String
  ){}
}