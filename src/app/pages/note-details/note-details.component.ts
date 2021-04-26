import { NotesService } from './../../shared/notes.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.note = new Note();
  }
  onSubmit(form: NgForm) {
    this.notesService.add(form.value);
    this.router.navigateByUrl('/');
  }
}
