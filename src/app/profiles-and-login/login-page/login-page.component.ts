import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
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

  lb_err: string = '';
  ngOnInit(): void {
  }

  async logIntoAccount() {
    this.lb_err = '';
    await this.authService.signIn(this.userEmail, this.userPassword).catch(err => {
      this.lb_err = err.toString();
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).', 'Invalid Email');
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: An internal AuthError has occurred. (auth/internal-error).', 'Email or password are incorrectly written/not filled');
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).', 'Email is already in use');
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).', "This email doesn't exist. Create a new account!");
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).', "Incorrect password!");
    })  
    if(this.lb_err == '') {
      this.router.navigate(['../home']);
    }
  }
}
