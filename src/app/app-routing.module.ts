import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-panel/admin-menu/admin-menu.component';
import { ListComponent } from './main-list-page/list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './profiles-and-login/login-page/login-page.component';
import { CreateAccountComponent } from './profiles-and-login/create-account/create-account.component';
import { FaqComponent } from './main-list-page/faq/faq.component';
import { AccountSettingsComponent } from './profiles-and-login/account-settings/account-settings.component';
import { LeaderboardListComponent } from './ILLP/leaderboard-list/leaderboard-list.component';
import { LeaderboardCreatorComponent } from './ILLP/leaderboard-creator/leaderboard-creator.component';
import { ProfilePageComponent } from './profiles-and-login/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'admin', component: AdminMenuComponent, canActivate: [AuthGuard] },
  { path: 'home', component: ListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: CreateAccountComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'botting-leaderboard', component: LeaderboardListComponent },
  { path: 'hall-of-fame', component: LeaderboardCreatorComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
