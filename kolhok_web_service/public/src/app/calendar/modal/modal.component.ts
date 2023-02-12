import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { CalendarDataServiceService } from 'app/service/calendar/calendar-data-service.service';
import { Editor } from 'ngx-editor';
import { DateEvent } from '../calendar.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  editor: Editor = new Editor();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DateEvent,
    public authService: JwtAuthenticationService
  ) { }

  onNoClick() : void {
  }

  ngOnInit(): void {
  }

}
