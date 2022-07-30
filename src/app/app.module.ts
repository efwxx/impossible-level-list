import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListElementComponent } from './list-element/list-element.component';
import { LevelListComponent } from './level-list/level-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListElementComponent,
    LevelListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
