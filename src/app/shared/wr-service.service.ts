import { Injectable } from '@angular/core';
import { 
  AngularFirestore, DocumentReference,
 } from '@angular/fire/compat/firestore';
import { WrSubmission } from './wr-submission';
import { AuthService } from './auth.service';
import { last } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WrServiceService {

  constructor(
    public firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
  ) { }

  submitWR(wr:WrSubmission, key:string) {
    let _wr = wr;
    _wr.status = 'pending';
    _wr.submitted_at = Date.now();
    _wr.$key = key;
    return this.firestore.collection('wr-sumbissions').doc(key).set(_wr);
  }

  async getWRFromID(id:string) {
    let _wrObj:WrSubmission[] = []
    await this.firestore.collection('wr-sumbissions').ref.where('$key', '==', id).get().then(snapshot => {
      _wrObj = snapshot.docs.map((e:any) => {
        return e.data();
      })
    })

    return _wrObj[0];
  }

  changeWRStatus(wrKey:string, status:string, reason?: string) {
    return this.firestore.collection('wr-sumbissions').doc(wrKey).set({status: status, reject_reason: reason}, {merge: true});
  }

  getAllSubmissions() {
    return this.firestore.collection('wr-sumbissions').ref.orderBy('submitted_at', 'desc').get();
  }

  openWRPage(wr:WrSubmission) {
    this.router.navigate(['/wr/'+wr.$key])
  }
}
