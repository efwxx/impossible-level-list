import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ImpossibleLevel } from 'src/app/shared/impossible-level';
import { LevelServiceService } from 'src/app/shared/level-service.service';
import { WrServiceService } from 'src/app/shared/wr-service.service';
import { WrSubmission } from 'src/app/shared/wr-submission';

@Component({
  selector: 'app-wr-submission-page',
  templateUrl: './wr-submission-page.component.html',
  styleUrls: ['./wr-submission-page.component.css']
})
export class WrSubmissionPageComponent implements OnInit {

  bil_levelID: string = '';
  bil_levelQuery: string = '';
  bil_run: string = '';
  bil_run_start: number = 0;
  bil_run_end: number = 0;
  bil_run_total: number = 0;
  bil_isRunFrom0: boolean = false;

  bil_uid: string = '';

  bil_videoURL: string = '';
  bil_rawFootageURL: string = '';

  ill:ImpossibleLevel[] = [];
  search_results_ILL: ImpossibleLevel[] = [];
  showSearchResults: boolean = false;

  bil_packagedWR: WrSubmission = {
    $key: '',
    progress: '',
    level: '',
    status: '',
    submitted_by: '',
    submitted_at: 0,
    isFromZero: false,
    video_url: ''
  }

  constructor(
    public authService: AuthService,
    private wrService: WrServiceService,
    private router: Router,
    public illService: LevelServiceService,
  ) { }

  ngOnInit(): void {
    this.loadILL();
  }

  setLevelID(id:string) {
    this.bil_levelID = id;
  }

  async loadILL() {
    await this.illService.getWholeLevelList().then(snapshot => {
      this.ill = snapshot.docs.map((e:any) => {
        return e.data()
      })
    })
  }

  searchILL() {
    let _tempList: ImpossibleLevel[] = [];
    if(this.bil_levelQuery != '') {
      this.showSearchResults = true;

      _tempList = this.ill.filter((e:ImpossibleLevel) => {
        return e.name.toLowerCase().includes(this.bil_levelQuery.toLowerCase());
      });

      this.search_results_ILL = _tempList;
    } else {
      this.showSearchResults = false;
      this.search_results_ILL = [];
    }
  }

  remapProgress() {
    let arr = this.bil_run.replaceAll('%', '').replaceAll(' ', '').split('-');

    if (arr.length > 1) {
      this.bil_isRunFrom0 = false;
      this.bil_run_start = Number(arr[0]);
      this.bil_run_end = Number(arr[1]);
      this.bil_run_total = this.bil_run_end - this.bil_run_start;
    } else {
      this.bil_isRunFrom0 = true;
      this.bil_run_start = 0;
      this.bil_run_end = Number(arr[0]);
      this.bil_run_total = this.bil_run_end;
    }
  }

  packageWR() {
    this.bil_packagedWR.level = this.bil_levelID;
    this.bil_packagedWR.progress = this.bil_run;
    this.bil_packagedWR.isFromZero = this.bil_isRunFrom0;
    this.bil_packagedWR.video_url = this.bil_videoURL;
    this.bil_packagedWR.raw_footage_url = this.bil_rawFootageURL;
  }

  async submitWR(uid:string | undefined) {
    this.packageWR();
    if(uid) {
      this.bil_packagedWR.submitted_by = uid;
      this.bil_packagedWR.$key = this.wrService.firestore.createId()
      await this.wrService.submitWR(this.bil_packagedWR, this.bil_packagedWR.$key);
      this.router.navigate(['/wr/'+this.bil_packagedWR.$key]);
    }
  }

}
