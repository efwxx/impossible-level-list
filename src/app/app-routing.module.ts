import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreatorLeaderboardComponent } from './creator-leaderboard/creator-leaderboard.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  {path: 'admin', component: AdminMenuComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: CreateAccountComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'leaderboard', component: CreatorLeaderboardComponent},
  {path: 'faq', component: FaqComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
