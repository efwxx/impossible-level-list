import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore'

import auth from 'firebase/compat/app'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserData, Roles } from './user-data';
import { EmailAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = Observable<UserData>;
  userArr:UserData[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
  }

  signIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  loginAsAdmin(email:string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      const data: UserData = {
        uid: res.user?.uid,
        email: email,
        roles: {admin:true, reader:true}
      }
      this.firestore.collection('user').doc(data.uid).set(data, {merge: true})
    }).catch(err => {
      console.log(err)
    })
  }

  createAccount(username:string, email:string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      const data: UserData = {
        uid: res.user?.uid,
        username: username,
        email: email,
        roles: {admin:false, reader:true}
      }
      this.firestore.collection('user').doc(data.uid).set(data);
      console.log('Successfully created account: ', email);
    })
  }

  createAdminAccount(email:string, password:string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      const data: UserData = {
        uid: res.user?.uid,
        email: email,
        roles: {admin:true, reader:true}
      }
      this.firestore.collection('user').doc(data.uid).set(data);
      console.log('Successfully created admin account: ', email);
    }).catch(err => {
      console.log(err);
    })
  }

  signOut() {
    this.afAuth.signOut();
  }

  async isCurrentUserAdmin() {
    const user = await this.afAuth.currentUser;
    this.firestore.collection('user').snapshotChanges().subscribe(res => { //get users
      this.userArr = res.map((e:any) => {
        const data = e.payload.doc.data();
        return data;
      })
    });

    const matchingUser = this.userArr.find((usr) => {
      return usr.roles.admin == true && usr.uid == user?.uid;
    })
    if(matchingUser != undefined) {
      console.log('Current user is ADMIN')
      return true;
    }
    console.log('Current user is NOT ADMIN')
    return false;
  }

  
}
