import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'
import { AuthService } from './shared/auth.service';
import { UserData } from './shared/user-data';
import { Router, RouterOutlet } from '@angular/router';
import { faFileLines, faHistory, faMoon, faQuestionCircle, faRefresh, faRightFromBracket, faRightToBracket, faRotateRight, faSun, faToolbox } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { getAnalytics } from 'firebase/analytics'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor (
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public router: Router
  ) {}
  title = 'Impossible Level List';
  _adminAccess:boolean = false;

  _themeRef:string = 'light';
  analytics = getAnalytics();

  //icons
  i_discord = faDiscord;
  i_patreon = faPatreon;
  i_oldList = faFileLines;
  i_faq = faQuestionCircle;
  i_logout = faRightFromBracket;
  i_login = faRightToBracket;
  i_darkmode = faMoon;
  i_lightmode = faSun;
  i_refresh = faRotateRight;
  i_admin = faToolbox;
  
  async refreshAdminAccess() {
    const isAdmin = await this.authService.isCurrentUserAdmin()
    if(isAdmin) {
      this._adminAccess = true;
    } else {
      this._adminAccess = false;
      this.router.navigate(['../home']);
    }
  }
  
  ngOnInit(): void {
    //themes
    if (localStorage['theme'] === 'dark' || (!('theme' in localStorage))) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      this._themeRef = 'dark';
      localStorage['theme'] = 'dark'
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      this._themeRef = 'light';
      localStorage['theme'] = 'light'
    }
  }
  
  toggleTheme() {
    console.log('here')
    if(localStorage['theme'] === 'dark') {
      this._themeRef = 'light'
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage['theme'] = 'light'
    } else if (localStorage['theme'] === 'light') {
      this._themeRef = 'dark'
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage['theme'] = 'dark'
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
