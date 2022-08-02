import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//Components
import { ListElementComponent } from './list-element/list-element.component';
import { ListComponent } from './list/list.component';
import { AdminListEditorComponent } from './admin-list-editor/admin-list-editor.component';
import { AdminDataEditorComponent } from './admin-data-editor/admin-data-editor.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

//Firebase setup
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { FirestoreModule, provideFirestore, getFirestore } from '@angular/fire/firestore';

//Import services
import { LevelServiceService } from 'src/app/shared/level-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Material
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    ListElementComponent,
    ListComponent,
    AdminListEditorComponent,
    AdminDataEditorComponent,
    AdminMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [LevelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
