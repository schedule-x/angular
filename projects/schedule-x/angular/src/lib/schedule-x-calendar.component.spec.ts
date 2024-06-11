import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleXCalendarComponent } from './schedule-x-calendar.component';

describe('AngularComponent', () => {
  let component: ScheduleXCalendarComponent;
  let fixture: ComponentFixture<ScheduleXCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleXCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleXCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
