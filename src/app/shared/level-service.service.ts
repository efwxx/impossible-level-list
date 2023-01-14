import { Injectable } from '@angular/core';
import { ImpossibleLevel } from './impossible-level';
import { 
  AngularFirestore, DocumentReference,
 } from '@angular/fire/compat/firestore';
import { orderBy, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LevelServiceService {
  constructor(public firestore: AngularFirestore) {}
  
  ill_unordered:ImpossibleLevel[] = [];
  ill_ordered:ImpossibleLevel[] = [];


  getEntireLevelList() {
    return this.firestore.collection('ill').snapshotChanges();
  }

  getWholeLevelList() {
    return this.firestore.collection('ill').ref.get()
  }

  getOrderedLevelList() {
    const coll = this.firestore.collection('ill').ref;
    return coll.orderBy('position', 'asc').get();
  }

  getOrderedLevelPage(start:number, end:number) {
    const coll = this.firestore.collection('ill').ref;
    console.log(end-start)
    let offset = 0;
    if(start > 1) {
      offset = 1;
    } else {
      offset = 0;
    }
    return coll.orderBy('position', 'asc').startAt(start+offset).endBefore(end+1).get()
  }

  addLevel(level:ImpossibleLevel) {
    level.id = this.firestore.createId();
    return this.firestore.collection("ill").doc(level.id).set(level);
  }

  updateLevel(level:ImpossibleLevel) {
    return this.firestore.collection("ill").doc(level.id).update(level);
  }

  deleteLevel(level:ImpossibleLevel) {
    return this.firestore.doc(`ill/${level.id}`).delete();
  }

  initILL() {
    this.getOrderedLevelList().then(snapshot => {
      this.ill_ordered = snapshot.docs.map((e:any) => { return e.data() })
    })
    
  }
}
