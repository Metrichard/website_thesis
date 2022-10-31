import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  events: any = [
    { title: 'Present', date: '2022-11-01', color: '#FF0000'},
    { title: 'Test', date: '2022-11-02', color: '#00FF00'},
    { title: 'Test2', date: '2022-11-03', color: '#0000FF'},
  ]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events
  };

  constructor() {}



}
