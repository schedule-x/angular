import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  TemplateRef
} from '@angular/core';
import {CalendarApp} from "@schedule-x/calendar";
import {CustomComponentMeta, CustomComponentsMeta} from "../types/custom-components";
import {createCustomComponentFn} from "../utils/create-custom-component-fn";
import {CommonModule, NgTemplateOutlet} from "@angular/common";
import {SxPortalComponent} from "../utils/sx-portal.component";

export const randomStringId = () =>
  's' + Math.random().toString(36).substring(2, 11)

@Component({
  selector: 'sx-calendar',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CommonModule,
    SxPortalComponent,
  ],
  template: `
    <div [attr.id]="calendarElementId" class="ng-calendar-wrapper"></div>

    <sx-portal
      *ngFor="let comp of customComponentsMeta;"
      [wrapperElement]="comp.wrapperElement"
      [elementTag]="'div'"
      [template]="getTemplate(comp.componentName)"
      [props]="comp.props"
    ></sx-portal>
  `,
  styles: ``
})
export class CalendarComponent implements AfterViewInit {
  @Input() calendarApp: CalendarApp;

  @ContentChild('timeGridEvent') timeGridEvent: TemplateRef<any>;
  @ContentChild('dateGridEvent') dateGridEvent: TemplateRef<any>;

  customComponentsMeta: CustomComponentsMeta = []

  public calendarElementId = randomStringId();

  getTemplate(componentName: string): TemplateRef<any> {
    if (componentName === 'timeGridEvent') return this.timeGridEvent

    if (componentName === 'dateGridEvent') return this.dateGridEvent

    throw new Error(`No template found for component name: ${componentName}`)
  }

  ngAfterViewInit() {
    if (typeof window !== 'object') return

    const calendarElement = document.getElementById(this.calendarElementId);
    if (!(calendarElement instanceof HTMLElement)) {
      throw new Error('No calendar element found')
    }

    this.setCustomComponentFns()
    this.calendarApp.render(calendarElement)
  }

  private setCustomComponentFns() {
    if (this.timeGridEvent) {
      this.calendarApp._setCustomComponentFn(
        'timeGridEvent',
        createCustomComponentFn(this.setCustomComponentMeta.bind(this), this.timeGridEvent, 'timeGridEvent')
      )
    }

    if (this.dateGridEvent) {
      this.calendarApp._setCustomComponentFn(
        'dateGridEvent',
        createCustomComponentFn(this.setCustomComponentMeta.bind(this), this.dateGridEvent, 'dateGridEvent')
      )
    }
  }

  setCustomComponentMeta = (component: CustomComponentMeta) => {
    const wrapperWasDetached = !(component.wrapperElement instanceof HTMLElement);
    if (wrapperWasDetached) return

    const filterOutComponentsWithDetachedWrappers = ({ wrapperElement }: { wrapperElement: HTMLElement | null }) =>
      wrapperElement instanceof HTMLElement
    const newCustomComponents = [
      ...this.customComponentsMeta.filter(filterOutComponentsWithDetachedWrappers)
    ]

    const ccid = component.wrapperElement.dataset['ccid']
    const existingComponent = newCustomComponents.find(
      ({ wrapperElement }) => wrapperElement.dataset['ccid'] === ccid
    )

    if (existingComponent) {
      existingComponent.wrapperElement.innerHTML = ''
      newCustomComponents.splice(
        newCustomComponents.indexOf(existingComponent),
        1
      )
    }

    this.customComponentsMeta = [...newCustomComponents, component]
  }
}
