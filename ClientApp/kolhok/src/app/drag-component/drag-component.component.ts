import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs';
import moment from 'moment';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceailToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: 'app-drag-component',
  templateUrl: './drag-component.component.html',
  styleUrls: ['./drag-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DragComponentComponent implements OnInit {

  viewDate = moment();
  viewDateDate = this.viewDate.toDate();
  weekStartOn: 0 = 0;
  dragToCreateActive = false;
  events: CalendarEvent[] = [];
  days: any[] = [];
  slots: any[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initDays();
  }

  initDays() {
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    for(let i = 0; i < this.days.length; i++) {
      let a = {days: this.days[i], time: []};
      this.slots.push(a);
    }
  }

  startDragToCreate(segment: WeekViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New slot',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
      actions: [
        {
          label: '',
          onClick: ({ event }: { event : CalendarEvent }) : void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.removeSlot(event.id);
          },
        },
      ],
    };

    this.events = [...this.events, dragToSelectEvent];

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate.toDate(), {
      weekStartsOn: this.weekStartOn,
    });

    fromEvent<MouseEvent>(document, 'mousemove').pipe(
      finalize(() => {
        delete dragToSelectEvent.meta.tmpEvent;
        this.dragToCreateActive = false;
        this.refresh();
      }),
      takeUntil(fromEvent(document, 'mouseup'))
    ).subscribe((mouseMoveEvent: MouseEvent) => {
      const minutesDiff = ceailToNearest(
        mouseMoveEvent.clientY - segmentPosition.top,
        30
      );

      const daysDiff = floorToNearest(
        mouseMoveEvent.clientX - segmentPosition.left,
        segmentPosition.width
      ) / segmentPosition.width;

      const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
      if(newEnd > segment.date && newEnd < endOfView) {
        dragToSelectEvent.end = newEnd;
      }
      this.refresh();
    });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
    this.getSlots();
  }

  convertTime(t: any) {
    return new Date(t).toTimeString();
  }

  convertDay(d: any) {
    return new Date(d).toLocaleDateString('en-us', {
      weekday: 'long',
    });
  }

  getSlots() {
    this.slots.map((day, i) => {
      this.slots[i].time = [];
      this.events.forEach((e) => {
        if(day.day == this.convertDay(e.start)) {
          this.slots[i].time.push({
            startTime: e.start,
            endTime: e.end,
            id: e.id
          });
        }
      });
    });
  }

  removeSlot(id: string | number | undefined) {
    for(let j = 0; j < this.slots.length; j++) {
      this.slots[j].time = this.slots[j].time.filter((t: any) => t.id !== id);
    }
  }
}
