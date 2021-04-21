import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes=[
  {path : '', component:NotesListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
