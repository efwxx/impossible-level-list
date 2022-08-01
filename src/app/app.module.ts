import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListElementComponent } from './list-element/list-element.component';

//Firebase setup
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule, provideFirestore,getFirestore } from '@angular/fire/firestore';

//Import services
import { LevelServiceService } from 'src/app/shared/level-service.service';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Material
import {MatIconModule} from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminListEditorComponent } from './admin-list-editor/admin-list-editor.component';
import { AdminListElementComponent } from './admin-list-element/admin-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    ListElementComponent,
    ListComponent,
    NavbarComponent,
    AdminListEditorComponent,
    AdminListElementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [LevelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
