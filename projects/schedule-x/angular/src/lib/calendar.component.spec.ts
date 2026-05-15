import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import type { CalendarApp } from '@schedule-x/calendar';

import { CalendarComponent } from './calendar.component';

type CustomComponentFn = (
  wrapperElement: HTMLElement,
  props: Record<string, unknown>,
) => void;

describe('AngularComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  imports: [CalendarComponent],
  template: `
    <sx-calendar [calendarApp]="calendarApp">
      <ng-template #headerContent let-arg>
        <span>{{ arg.$app.label }}</span>
      </ng-template>
    </sx-calendar>
  `,
})
class HostComponent {
  private customComponentFns: Record<string, CustomComponentFn> = {};

  calendarApp = {
    _setCustomComponentFn: (fnId: string, fn: CustomComponentFn) => {
      this.customComponentFns[fnId] = fn;
    },
    render: (calendarElement: HTMLElement) => {
      const wrapperElement = document.createElement('div');
      wrapperElement.dataset['ccid'] = 'header-content';
      calendarElement.appendChild(wrapperElement);

      this.customComponentFns['headerContent'](wrapperElement, {
        $app: { label: 'Custom header' },
      });
    },
  } as unknown as CalendarApp;
}

describe('AngularComponent with custom components', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  it('renders custom components without expression changed errors', fakeAsync(() => {
    const fixture = TestBed.createComponent(HostComponent);

    expect(() => fixture.detectChanges()).not.toThrow();
    expect(() => flushMicrotasks()).not.toThrow();

    expect(fixture.nativeElement.textContent).toContain('Custom header');
  }));
});
