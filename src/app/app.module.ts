import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: NotesListComponent,
      },
      {
        path: 'new',
        component: NoteDetailsComponent,
      },
      {
        path: ':id',
        component: NoteDetailsComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),FormsModule,BrowserAnimationsModule],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
