import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarDataServiceService } from 'app/service/calendar/calendar-data-service.service';
import { DateEvent } from '../calendar.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  dateEvent: DateEvent = new DateEvent('', '', '', '');

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private calendarDataService: CalendarDataServiceService
  ) { }

  onNoClick() : void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }

}
