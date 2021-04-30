import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() link: string;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', { static: true }) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText: ElementRef<HTMLElement>;
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHight = parseInt(style.getPropertyValue('height'), 10);
    if (this.bodyText.nativeElement.scrollHeight > viewableHight) {
      //if there is a text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
  }
  onXButtonClick() {
    this.deleteEvent.emit();
  }
}
