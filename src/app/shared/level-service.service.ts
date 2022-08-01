import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { ImpossibleLevel } from 'src/app/shared/impossible-level'

@Injectable({
  providedIn: 'root'
})
export class LevelServiceService {
  constructor(private firestore: AngularFirestore) {}
  
  getList() {
    return this.firestore.collection("ill")
        .snapshotChanges()
  }
}
