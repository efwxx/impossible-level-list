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
  constructor(public firestore: AngularFirestore) {}
  
  getList() {
    return this.firestore.collection("ill")
        .snapshotChanges()
  }

  addLevel(level:object) {
    return this.firestore.collection("ill").add(level)
  }

  levelExistsInDatabase(name:string, creators:string) {
    return false;
  }
}
