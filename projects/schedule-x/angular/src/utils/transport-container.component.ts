import {
  Component,
  Input,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  ElementRef,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {CommonModule} from "@angular/common";

const dummyContainer = typeof document !== 'undefined' ? document.createDocumentFragment() : null;

const appendElement = (subject: HTMLElement, wrapperEl: HTMLElement): void => {
  wrapperEl.appendChild(subject)
};

@Component({
  selector: 'transport-container',
  imports: [CommonModule],
  templateUrl: './transport-container.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class TransportContainerComponent implements AfterViewInit {
  @Input() wrapperEl!: HTMLElement;
  @Input() elTag!: string;
  @Input() elClasses?: string[];
  @Input() elStyle?: Record<string, unknown>;
  @Input() elAttrs?: Record<string, unknown>;
  @Input() template!: TemplateRef<any>;
  @Input() renderProps?: any;

  @ViewChild('rootEl') rootElRef?: ElementRef;

  ngAfterViewInit() {
    const rootEl: HTMLElement = this.rootElRef?.nativeElement;
    appendElement(rootEl, this.wrapperEl);
    applyElAttrs(rootEl, undefined, this.elAttrs);
  }
}

function applyElAttrs(
  el: Element,
  previousAttrs: Record<string, any> = {},
  currentAttrs: Record<string, any> = {}
): void {
  // these are called "attributes" but they manipulate DOM node *properties*

  for (const attrName in previousAttrs) {
    if (!(attrName in currentAttrs)) {
      (el as any)[attrName] = null;
    }
  }

  for (const attrName in currentAttrs) {
    (el as any)[attrName] = currentAttrs[attrName];
  }
}
