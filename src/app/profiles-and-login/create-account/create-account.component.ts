import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';

  randomExampleUsername: string = '';
  _keywords1: string[] = [
    'sloom', 'lennard', 'wistfully',
    'barry', 'ReLife', 'ging',
    'schafs', 'minus wave', 'sheep',
    'domba'
  ];
  _keywords2: string[] = [
    'liker', 'disliker', 'hater',
    'CEO', 'creator',
    'worshipper', 'simp', ''
  ]

  lb_err: string = '';
  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.randomExampleUsername += this._keywords1[Math.floor(Math.random() * this._keywords1.length)]
    this.randomExampleUsername += this._keywords2[Math.floor(Math.random() * this._keywords2.length)]
    this.randomExampleUsername += Math.floor(Math.random() * 777).toString();
  }

  async createNewAccount() {
    await this.authService.createAccount(this.userName, this.userEmail, this.userPassword).catch(err => {
      this.lb_err = err.toString();
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).', 'Invalid Email');
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: An internal AuthError has occurred. (auth/internal-error).', 'Email or password are incorrectly written/not filled');
      this.lb_err = this.lb_err.replace('FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).', 'Email is already in use');

    })
    if(this.lb_err == '') {
      this.router.navigate(['../home']);
    }
  }
}
