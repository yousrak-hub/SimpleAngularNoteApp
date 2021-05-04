import { NotesService } from './../../shared/notes.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  filteredNotes: Note[] = new Array<Note>();
  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>;
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notesService.getAll();
  }
  deleteNote(note: Note) {
    let noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
    this.filter(this.filterInputElRef.nativeElement.value);
  }
  filter(query: string) {
    let allResults: Note[] = new Array<Note>();
    query = query.toLowerCase().trim();
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);
    // compile all relevant results into the allResults array
    terms.forEach((term) => {
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    });
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
    // now sort by relevancy
    this.sortByRelevancy(allResults);
  }
  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach((e) => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }
  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter((note) => {
      if (
        (note.body && note.body.toLowerCase().includes(query)) ||
        note.title.toLowerCase().includes(query)
      ) {
        return true;
      }
      return false;
    });
    return relevantNotes;
  }
  sortByRelevancy(searchResults: Note[]) {
    let noteCountObj: Object = {}; // format - key:value => NoteId:number (note object id:count)
    searchResults.forEach((note) => {
      let noteId = this.notesService.getId(note);
      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    });
    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);
      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];
      return bCount - aCount;
    });
  }
  generateNoteURL(note: Note): number {
    let noteId = this.notesService.getId(note);
    return noteId;
  }
}
