import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//Components
import { ListElementComponent } from './list-element/list-element.component';
import { ListComponent } from './list/list.component';
import { AdminDataEditorComponent } from './admin-data-editor/admin-data-editor.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';

//Firebase setup
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { FirestoreModule, provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';

//Import services
import { LevelServiceService } from 'src/app/shared/level-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreatorLeaderboardComponent } from './creator-leaderboard/creator-leaderboard.component'

@NgModule({
  declarations: [
    AppComponent,
    ListElementComponent,
    ListComponent,
    AdminDataEditorComponent,
    AdminMenuComponent,
    LoginPageComponent,
    CreateAccountComponent,
    ProfilePageComponent,
    CreatorLeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    ScrollingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [LevelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
