import { Injectable } from '@angular/core';
import { ImpossibleLevel } from './impossible-level';
import { 
  AngularFirestore, DocumentReference,
 } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LevelServiceService {
  constructor(public firestore: AngularFirestore) {}
  
  getEntireLevelList() {
    return this.firestore.collection('ill').snapshotChanges();
  }

  addLevel(level:ImpossibleLevel) {
    level.id = this.firestore.createId();
    return this.firestore.collection("ill").add(level)
  }

  updateLevel(level:ImpossibleLevel) {
    return this.firestore.doc(`ill/${level.id}`).update(level);
  }

  deleteLevel(level:ImpossibleLevel) {
    return this.firestore.doc(`ill/${level.id}`).delete();
  }
}
