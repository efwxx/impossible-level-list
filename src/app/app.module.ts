import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//Components
import { ListElementComponent } from './main-list-page/list-element/list-element.component';
import { ListComponent } from './main-list-page/list/list.component';
import { AdminDataEditorComponent } from './admin-panel/admin-data-editor/admin-data-editor.component';
import { AdminMenuComponent } from './admin-panel/admin-menu/admin-menu.component';
import { LoginPageComponent } from './profiles-and-login/login-page/login-page.component';

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
import { CreateAccountComponent } from './profiles-and-login/create-account/create-account.component';
import { FaqComponent } from './main-list-page/faq/faq.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoleElemComponent } from './misc/role-elem/role-elem.component';
import { AccountSettingsComponent } from './profiles-and-login/account-settings/account-settings.component';
import { LeaderboardListComponent } from './ILLP/leaderboard-list/leaderboard-list.component';
import { LeaderboardElementComponent } from './ILLP/leaderboard-element/leaderboard-element.component';
import { LeaderboardCreatorComponent } from './ILLP/leaderboard-creator/leaderboard-creator.component';
import { HallOfFameElementComponent } from './ILLP/hall-of-fame-element/hall-of-fame-element.component';
import { ProfilePageComponent } from './profiles-and-login/profile-page/profile-page.component';
import { BundleComponent } from './ILLP/bundle/bundle.component';
import { WrWidgetComponent } from './ILLP/wr-widget/wr-widget.component';
import { WrEntryComponent } from './ILLP/wr-entry/wr-entry.component';
import { BundlePageComponent } from './ILLP/bundle-page/bundle-page.component';
import { IllpHomePageComponent } from './ILLP/illp-home-page/illp-home-page.component';
import { WrSubmissionPageComponent } from './ILLP/wr-submission-page/wr-submission-page.component'

@NgModule({
  declarations: [
    AppComponent,
    ListElementComponent,
    ListComponent,
    AdminDataEditorComponent,
    AdminMenuComponent,
    LoginPageComponent,
    CreateAccountComponent,
    FaqComponent,
    RoleElemComponent,
    AccountSettingsComponent,
    LeaderboardListComponent,
    LeaderboardElementComponent,
    LeaderboardCreatorComponent,
    HallOfFameElementComponent,
    ProfilePageComponent,
    BundleComponent,
    WrWidgetComponent,
    WrEntryComponent,
    BundlePageComponent,
    IllpHomePageComponent,
    WrSubmissionPageComponent,
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
    provideFirestore(() => getFirestore()),
    FontAwesomeModule
  ],
  providers: [LevelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
