import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { CalendarDataServiceService } from 'app/service/calendar/calendar-data-service.service';
import { Editor, Toolbar } from 'ngx-editor';
import { DateEvent } from '../calendar.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DateEvent,
    public authService: JwtAuthenticationService,
    private calendarDataService: CalendarDataServiceService
  ) { }

  onNoClick() : void {
  }

  ngOnInit(): void {
  }

  deleteCurrentEvent() {
    this.calendarDataService.deleteDateEvent(this.data.id).subscribe(
      _ => {
        window.location.reload();
      }
    )
  }

  updateDateEvent() {
    this.calendarDataService.updateDateEvent(this.data).subscribe(
      _ => {
        window.location.reload();
      }
    );
  }

}
