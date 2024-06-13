import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarComponent} from "../../../schedule-x/angular/src/lib/calendar.component";
import {createCalendar, viewWeek} from "@schedule-x/calendar";
import {isPlatformBrowser, NgIf} from '@angular/common';
import '@schedule-x/theme-default/dist/calendar.css'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, NgIf],
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
    views: [viewWeek]
  })

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
  ){}

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
