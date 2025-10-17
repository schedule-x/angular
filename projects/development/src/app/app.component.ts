import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from '../../../schedule-x/angular/src/lib/calendar.component';
import {
  createCalendar,
  CalendarApp,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar';
import { isPlatformBrowser } from '@angular/common';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import 'temporal-polyfill/global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'development';
  calendarApp: CalendarApp;
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.calendarApp = createCalendar({
        showWeekNumbers: true,
        events: [
          {
            id: '1',
            title: 'Event 1',
            start: Temporal.Now.zonedDateTimeISO(),
            end: Temporal.Now.zonedDateTimeISO().add({ hours: 1 }),
          },

          {
            id: '2',
            title: 'Event 2',
            start: Temporal.Now.zonedDateTimeISO().add({ days: 1 }),
            end: Temporal.Now.zonedDateTimeISO().add({ days: 1, hours: 1 }),
          },
        ],
        views: [
          createViewWeek(),
          createViewMonthGrid(),
          createViewMonthAgenda(),
        ],
        plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
      });
    }
  }

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setEvents() {
    this.calendarApp.events.set([
      {
        id: '5',
        title: 'Event 5',
        start: Temporal.Now.plainDateISO().add({ days: 2 }),
        end: Temporal.Now.plainDateISO().add({ days: 2, hours: 1 }),
      },

      {
        id: '6',
        title: 'Event 6',
        start: Temporal.Now.zonedDateTimeISO().add({ days: 1 }),
        end: Temporal.Now.zonedDateTimeISO().add({ days: 1, hours: 1 }),
      },
    ]);
  }
}
