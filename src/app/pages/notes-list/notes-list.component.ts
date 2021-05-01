import { NotesService } from './../../shared/notes.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        //initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        // we first want to animate the spacing (which includes height and margin)
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        //final state
        animate(68),
      ]),
      transition('* => void', [
        //first scale up
        animate(50, style({ transform: 'scale(1.05)' })),
        //then scale down back to normal size while beginning to fade out
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        //scale down and fade down completely
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        //then animate the spacing (which includes height margin and padding)
        animate(
          '150ms ease-out',
          style({
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            'margin-bottom': 0,
          })
        ),
      ]),
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
  }
  deleteNote(id: number) {
    this.notesService.delete(id);
  }
}
