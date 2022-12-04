import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions, disableCursor } from '@fullcalendar/angular';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { CalendarDataServiceService } from 'app/service/calendar/calendar-data-service.service';
import { Editor, Toolbar } from 'ngx-editor';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() newEvent: DateEvent = new DateEvent('-1','','','');

  events: any[] = [];

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateEvent.bind(this),
    events: this.events,
  };

  constructor(
    private calendarDataService: CalendarDataServiceService,
    public authService: JwtAuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.initCalendar();
  }

  initCalendar() {
    this.calendarDataService.retrieveAllEvents().subscribe(
      response => {
        this.events = response
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          dateClick: this.handleDateEvent.bind(this),
          events: this.events,
        };
      }
    )
  }

  handleDateEvent(arg: any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    // this.dialog.open(ModalComponent, dialogConfig);
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
    public description: String
  ){}
}