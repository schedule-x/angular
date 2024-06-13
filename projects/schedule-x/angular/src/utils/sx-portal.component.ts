import {
  Component,
  Input,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'sx-portal',
  imports: [CommonModule],
  templateUrl: './sx-portal.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class SxPortalComponent implements AfterViewInit {
  @Input() wrapperElement!: HTMLElement;
  @Input() elementTag!: string;
  @Input() template!: TemplateRef<any>;
  @Input() props?: any;

  @ViewChild('rootEl') rootElRef?: ElementRef;

  ngAfterViewInit() {
    console.log(this.props)
    const rootEl: HTMLElement = this.rootElRef?.nativeElement;
    this.wrapperElement.appendChild(rootEl);
  }
}
