import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';
import { async, last } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Roles, UserData } from 'src/app/shared/user-data';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  //setup vars for the form
  bil_username:string | undefined = '';
  bil_gd_username:string | undefined = '';
  bil_bio:string | undefined = '';
  bil_shownInLeaderboards:boolean | undefined = true;
  bil_profilepicture:string | undefined = '';
  bil_email:string | undefined = ''
  bil_roles:Roles | undefined;
  bil_pfp_file:File | undefined;
  bil_errLabel:string = '';

  bil_hasLoaded:boolean = true;
  bil_showUploadAnim:boolean = false;
  _user_uid:string | undefined = ''

  buffer_user:Object | undefined;

  i_gear = faGear;

  constructor(
    public authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) 
  {

  }

  ngOnInit(): void {
    // this.bil_gd_username = 'poopy'
    this.loadUserData();
  }

  loadUserData() {
    this.authService.user$.subscribe((_usr) => {
      if(_usr != undefined || _usr != null) {
        this._user_uid = _usr.uid
        this.bil_username = _usr.username;
        this.bil_gd_username = _usr.gd_username;
        this.bil_bio = _usr.description;
        this.bil_shownInLeaderboards = _usr.show_in_leaderboards;
        this.bil_profilepicture = _usr.profilePicture
      }
    })
  }

  packageUserData() {
    this.buffer_user = {
      uid: this._user_uid,
      username: this.bil_username,
      gd_username: this.bil_gd_username,
      profilePicture: this.bil_profilepicture,
      description: this.bil_bio,
      show_in_leaderboards: this.bil_shownInLeaderboards
    }
  }

  updateUserData() {
    this.packageUserData();
    this.authService.firestore.collection('user').doc(this._user_uid).set(this.buffer_user, { merge: true });
    this.router.navigate(["/"]);
  }

  pfpFileChange($event:any) {
    this.bil_pfp_file = $event.target.files[0];
  }

  async updatePFP() {
    //setup
    this.bil_showUploadAnim = true;
    const pfp_path = `/ILL_profilepics/pfp_${this._user_uid}_${this.bil_username}_${Date.now()}.png`
    const ref = this.storage.ref(pfp_path);

    if(this.bil_pfp_file?.size != undefined && this.bil_pfp_file?.size < 1080549) {
      await this.storage.upload(pfp_path, this.bil_pfp_file);
      this.authService.firestore.collection('user').doc(this._user_uid).set({profilePicture: await ref.getDownloadURL().toPromise()}, { merge: true });
      this.bil_showUploadAnim = false;
    } else {
      this.bil_errLabel = 'File cannot be larger than 1MB'
      this.bil_showUploadAnim = false;
    }
  }
  
  cancelUserUpdate() {
    this.router.navigate(["/"]);
  }
}
