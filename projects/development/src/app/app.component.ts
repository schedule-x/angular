import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarComponent} from "../../../schedule-x/angular/src/lib/calendar.component";
import {createCalendar, viewWeek, viewMonthGrid, viewMonthAgenda} from "@schedule-x/calendar";
import { isPlatformBrowser } from '@angular/common';
import '@schedule-x/theme-default/dist/calendar.css'
import {createEventModalPlugin} from "@schedule-x/event-modal";
import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";
import { parse, format } from 'date-fns';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CalendarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'development';
  calendarApp = createCalendar({
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-06-11 08:00',
        end: '2024-06-11 09:00',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2024-06-11 10:00',
        end: '2024-06-11 11:00',
      },
      {
        id: '3',
        title: 'Event 3',
        start: '2024-06-11',
        end: '2024-06-11',
      },
      {
        id: '4',
        title: 'Event 4',
        start: '2024-06-11',
        end: '2024-06-13',
      }
    ],
    views: [viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin()
    ]
  })

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
  ){}

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setEvents() {
    // const allEvents = this.calendarApp.events.getAll()
    // allEvents.forEach(event => {
    //   event.title = 'New Title'
    // })
    // this.calendarApp.events.set(allEvents)
    const today = new Date();
    const dateString = format(today, 'yyyy-MM-dd');
    this.calendarApp.events.set([
      {
        id: '5',
        title: 'Event 5',
        start: `${dateString} 08:00`,
        end: `${dateString} 09:00`,
      },
      {
        id: '6',
        title: 'Event 6',
        start: `${dateString} 10:00`,
        end: `${dateString} 11:00`,
      },
    ])
  }
}
