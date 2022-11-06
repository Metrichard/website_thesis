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

  events?: any;

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

  ngOnInit(): void {
    this.calendarDataService.retrieveAllEvents().subscribe(
      response => {
        this.events = response
      }
    )
  }

  handleDateEvent(arg:any) {
    alert('date click' + arg.dateStr);
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