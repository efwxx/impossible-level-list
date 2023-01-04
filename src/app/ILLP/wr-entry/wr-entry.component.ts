import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { UserData } from 'src/app/shared/user-data';
import { WrServiceService } from 'src/app/shared/wr-service.service';
import { WrSubmission } from 'src/app/shared/wr-submission';

@Component({
  selector: 'app-wr-entry',
  templateUrl: './wr-entry.component.html',
  styleUrls: ['./wr-entry.component.css']
})
export class WrEntryComponent implements OnInit {

  bil_data: WrSubmission | undefined;
  bil_levelName: string = '';
  bil_creatorName: string = '';

  bil_sumbitter:UserData | null | undefined;

  bil_run_start: number = 0;
  bil_run_end: number = 0;
  bil_run_total: number = 0;

  bil_status: string = 'Unknown';

  bil_show: boolean = false;
  found_wr: boolean = true;
  bil_videoIsYoutube: boolean = false;
  bil_yt_link:SafeResourceUrl | undefined;

  selected_mascott_name:string = '';
  selected_mascott_path:string = '';
  selected_mascotts = [
    {name: 'Sloom', path: '../../../assets/mascotts/mascott_sloom.png'},
    {name: 'Jerry', path: '../../../assets/mascotts/mascott_jerry.png'},
    {name: 'Ging', path: '../../../assets/mascotts/mascott_ging.png'},
    {name: 'Subsuming Cube', path: '../../../assets/mascotts/mascott_sc.png'},
    {name: 'Hank', path: '../../../assets/mascotts/mascott_hank.png'},
    {name: 'Relife Jump Jumping', path: '../../../assets/mascotts/mascott_relife.png'},
  ];

  i_link = faUpRightFromSquare; 

  adm_rejectReason:string = '';

  constructor(
    private route: ActivatedRoute,
    private wr_service: WrServiceService,
    public auth_service: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getWRData()
    this.getRandomMascott();
  }

  async getWRData() {
    let _wrID = this.route.snapshot.paramMap.get('id');

    if(_wrID) {
      let _tmpWR = await this.wr_service.getWRFromID(_wrID)

      if(_tmpWR) {
        this.bil_data = _tmpWR;
        this.bil_show = true;
        this.found_wr = true;

        this.bil_status = this.bil_data.status;

        //get run data
        let arr = this.bil_data.progress.replaceAll('%', '').replaceAll(' ', '').split('-');

        if (arr.length > 1) {
          this.bil_run_start = Number(arr[0]);
          this.bil_run_end = Number(arr[1]);
          this.bil_run_total = this.bil_run_end - this.bil_run_start;
        } else {
          this.bil_run_start = 0;
          this.bil_run_end = Number(arr[0]);
          this.bil_run_total = this.bil_run_end;
        }

        //get level data
        let arr2 = this.bil_data.level.split('-');
        this.bil_levelName = arr2[0];
        this.bil_creatorName = arr2[1];

        //get submitter data
        this.bil_sumbitter = await this.auth_service.getDataFromUID(this.bil_data.submitted_by);

        //check if video is youtube
        if(this.bil_data.video_url.includes('youtu')) {
          //is youtube link
          this.bil_videoIsYoutube = true;
          let _yt_vid_id = this.bil_data.video_url.replace('youtube.com/watch?v=', '')
          .replace('https://', '')
          .replace('www.', '')
          .replace('youtu.be/', '');
          let _embed_link = 'https://www.youtube.com/embed/'+_yt_vid_id
          this.bil_yt_link = this.sanitizer.bypassSecurityTrustResourceUrl(_embed_link);
        } else {

        }
      } else {
        this.bil_show = true;
        this.found_wr = false;
      }
    }
  }

  async approveWR() {
    if(this.bil_data) {
      await this.wr_service.changeWRStatus(this.bil_data?.$key, 'Approved', '');
      this.getWRData();
    }
  }
  
  async rejectWR() {
    if(this.bil_data) {
      await this.wr_service.changeWRStatus(this.bil_data?.$key, 'Rejected', this.adm_rejectReason);
      this.getWRData();
    }
  }

  getRandomMascott() {
    let _rng = Math.round(Math.random() * (this.selected_mascotts.length-1));
    this.selected_mascott_name = this.selected_mascotts[_rng].name
    this.selected_mascott_path = this.selected_mascotts[_rng].path
  }
}
