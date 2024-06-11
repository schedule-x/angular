import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {CalendarApp} from "@schedule-x/calendar";

export const randomStringId = () =>
  's' + Math.random().toString(36).substring(2, 11)

@Component({
  selector: 'sx-calendar',
  standalone: true,
  imports: [],
  template: `
    <div [attr.id]="randomId" class="ng-calendar-wrapper"></div>
  `,
  styles: ``
})
export class ScheduleXCalendarComponent implements AfterViewInit {
  @Input() calendarApp: CalendarApp;

  public randomId = randomStringId();

  ngAfterViewInit() {
    if (typeof window !== 'object') return

    const calendarElement = document.getElementById(this.randomId);
    if (!(calendarElement instanceof HTMLElement)) {
      throw new Error('No calendar element found')
    }

    this.calendarApp.render(calendarElement)
  }
}
