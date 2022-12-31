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
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
  ) { }

  submitWR(wr:WrSubmission) {
    let _wr = wr;
    _wr.status = 'pending';
    _wr.submitted_at = Date.now();
    _wr.$key = this.firestore.createId()
    return this.firestore.collection('wr-sumbissions').doc(_wr.$key).set(_wr);
  }

  changeWRStatus(wrKey:string, status:string) {
    return this.firestore.collection('wr-sumbissions').doc(wrKey).set({status: status}, {merge: true});
  }

  getAllSubmissions() {
    return this.firestore.collection('wr-sumbissions').ref.orderBy('submitted_at', 'desc').get();
  }

  openWRPage(wr:WrSubmission) {
    this.router.navigate(['/wr/'+wr.$key])
  }
}
