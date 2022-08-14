import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  userEmail: string = '';
  userPassword: string = '';
  adminUserKey: string = '';
  ngOnInit(): void {
  }

  logIntoAccount() {
    this.authService.signIn(this.userEmail, this.userPassword);
    if (this.adminUserKey == environment.adminAccessKey) {
      console.log('Admin key correct');
      this.router.navigate(['../admin']);
    } else {
      this.router.navigate(['../home']);
    }
  }
}
