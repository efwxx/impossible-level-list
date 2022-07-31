import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListElementComponent } from './list-element/list-element.component';

//Firebase setup
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';

//Import services
import { LevelServiceService } from 'src/app/shared/level-service.service';
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [
    AppComponent,
    ListElementComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule
  ],
  providers: [LevelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
