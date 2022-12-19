import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore'

import auth from 'firebase/compat/app'

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserData, Roles } from './user-data';
import { EmailAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { async } from '@firebase/util';
import { ImpossibleLevel } from './impossible-level';
import { user } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserData | null | undefined>;
  userArr: UserData[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<UserData>(`user/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    )
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  loginAsAdmin(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      const data: UserData = {
        uid: res.user?.uid,
        email: email,
        roles: { admin: true, reader: true }
      }
      this.firestore.collection('user').doc(data.uid).set(data, { merge: true })
    }).catch(err => {
      console.log(err)
    })
  }

  createAccount(username: string, email: string, password: string) {
    let _default_pfps:string[] = [
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_1.png?alt=media&token=82730092-146b-4184-8cb6-dcf1231be25b',
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_2.png?alt=media&token=421075f5-d291-43fa-a152-5f1f1fadd57c',
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_3.png?alt=media&token=a67a805c-3376-473b-b5b8-9b6bee91077a',
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_4.png?alt=media&token=87af460c-f171-40bf-9a2e-4adf40fec13c',
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_5.png?alt=media&token=e12c9cd5-0be1-4d41-abb0-1ab812d180ac',
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_6.png?alt=media&token=cb9c532e-a0ec-4de1-8da3-fe02d81c1382',
      'https://firebasestorage.googleapis.com/v0/b/impossible-level-list.appspot.com/o/ILL_profilepics%2Fpfp_7.png?alt=media&token=ee553070-5010-4013-82b3-98ecb69bc3fc',

    ];

    return this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      const data: UserData = {
        uid: res.user?.uid,
        username: username,
        gd_username: '',
        email: email,
        roles: { admin: false, reader: true },
        ill_points: 0,
        description: '',
        profilePicture: _default_pfps[Math.round(Math.random() * _default_pfps.length)],
        created_levels: 0,
        badges: ['Member'],
        show_in_leaderboards: false,
      }
      this.firestore.collection('user').doc(data.uid).set(data, { merge: true });
      console.log('Successfully created account: ', email);
    })
  }

  createAdminAccount(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      const data: UserData = {
        uid: res.user?.uid,
        email: email,
        roles: { admin: true, reader: true }
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

  isCurrentUserAdmin() {
    let _usr = undefined;
    const _obs = this.user$.subscribe(val => _usr = val);
    console.log(_usr);
  }

  async getAllUsers() {
    return this.firestore.collection('user').ref.get();
  }

  async getDataFromGDUsername(username: string) {
    let _arr: UserData[] = [];
    await this.firestore.collection('user').ref.where('gd_username', '==', username).get().then((snapshot: any) => {
      _arr = snapshot.docs.map((e: any) => {
        const data = e.data();
        return data;
      })
    })

    if (_arr.length > 0) {
      return _arr[0];
    } else {
      return null;
    }
  }

  async getDataFromUID(uid: string) {
    let _arr: UserData[] = [];
    await this.firestore.collection('user').ref.where('uid', '==', uid).get().then((snapshot: any) => {
      _arr = snapshot.docs.map((e: any) => {
        const data = e.data();
        return data;
      })
    })

    if (_arr.length > 0) {
      return _arr[0];
    } else {
      return null;
    }
  }

}
