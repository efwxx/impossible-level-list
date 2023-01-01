import { RouterModule, Routes } from '@angular/router';

import { Component, Inject, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { LevelServiceService } from 'src/app/shared/level-service.service'
import { ImpossibleLevel } from '../../shared/impossible-level'
import { Attribute } from '@angular/compiler';
import { 
  animate, state, style, transition, trigger 
} from '@angular/animations';

import {

} from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faBarsStaggered, faBook, faBookmark, faCheckCircle, faDeleteLeft, faEllipsis, faHourglass, faInfo, faInfoCircle, faScrewdriverWrench, faStar, faStarHalf, faStopwatch, faTag, faTrophy, faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { UserData } from 'src/app/shared/user-data';
import { WrServiceService } from 'src/app/shared/wr-service.service';
import { WrSubmission } from 'src/app/shared/wr-submission';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '555px',
      })),
      state('closed', style({
        height: '160px',
      })),
      transition('open => closed', [
        animate('0.3s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.2s ease-in-out')
      ]),
    ]),
    trigger('mobileOpenClose', [
      // ...
      state('m_open', style({
        height: '830px',
      })),
      state('m_closed', style({
        height: 'fit-content',
      })),
      transition('m_open => m_closed', [
        animate('0.3s ease-in-out')
      ]),
      transition('m_closed => m_open', [
        animate('0.2s ease-in-out')
      ]),
    ])
  ]
})
export class ListElementComponent implements OnInit {

  //Component data
  level_name = "CYCLOLCYC";
  level_position = 1;
  level_creators_short = "Eightos and more";
  level_creators_full = [
    'Eightos',
    'Arekusul14',
    'Darmuth',
    'AuraXalaiv',
    'Skub',
    'Sunbrey',
    'OrbPerson',
    'Maus999',
    'Ewe23',
    'Tio2',
    'MagYTu',
    'Prototype Hipo'
  ]
  level_fps = 1974;
  level_id = '77018514'; //Write Unreleased if not given
  level_gd_version = '2.1';
  level_tags = [
    '2 player',
    'No Victors',
  ]
  level_minimal_wr_percent = '>2%'
  level_wr = '0.092% (eli22507)';
  level_wr_yt = 'https://youtu.be/xD9BWvMZGm4'
  level_uploader = 'Xane88'
  level_marked_for_removal = false;
  level_annotated = true;
  level_markdown_reason = '';
  level_isRated = false;
  level_isUnRated = false;
  level_creatorPFPs:string[] = [];
  level_creatorPFPs_limited:string[] = [];
  level_creatorAccounts:UserData[] = [];

  level_wrID_run:string = '';
  level_wrID_0:string = '';
  level_manualWR:boolean = false;
  
  card_expanded = false;
  card_mobile_expanded = false;
  card_yt_videoID = 'DqB2uTY9-Ss'
  card_yt_vidEmbedURL: SafeResourceUrl | undefined;
  card_yt_thumbnailURL: SafeResourceUrl | undefined;
  card_wideshot_link: SafeResourceUrl | undefined;
  card_haswideshot: boolean = false;

  //icons
  i_annotation = faBookmark;
  i_removal = faXmark;
  i_info = faInfoCircle;
  i_creators = faScrewdriverWrench;
  i_wr = faTrophy;
  i_verified = faCheckCircle;
  i_fps = faHourglass;
  i_levelID = faBarsStaggered;
  i_tag = faTag;
  i_expand = faAngleDown;
  i_collapse = faAngleUp;
  i_rated = faStar;
  i_unrated = faStarHalf;
  i_link = faUpRightFromSquare;
  i_more = faEllipsis;

  //all data in 1 object
  @Input('ill_level') ill_level:ImpossibleLevel = {
    id: '',
    position: 0,
    name: 'The Cyclonic',
    fps: -1820385,
    level_id: '77018514',
    gd_version: '2.2',
    yt_videoID: 'DqB2uTY9-Ss',
    creators_short: 'everyone & skub',
    creators_full: ['Eightos1', 'Eightos2', 'Eightos3', 'Eightos4', 'Eightos5', 'Ewe23', 'Locked101', 'MateussDev', 'NotRealAcc', 'LennardHater228', 'skubb', 'adaf', 'AuraXalaiv'],
    tags: ['sex', 'girl', 'furry', 'Previously Rated', 'Rated'],
    uploader: 'Xane88',
    wr_min_percent: '0.01',
    wr: '0.092% (eli22507)',
    wr_yt: 'https://youtu.be/xD9BWvMZGm4',
    marked_for_removal: true,
    annotated: true,
    marking_reason: 'Simply unfunny, horrendus, impossible to playtest and generally bad',
    wide_level_shot_url: 'https://media.discordapp.net/attachments/598756348829892647/1043253620772196362/unknown.png'
  };
  @Input('ill_position') ill_position?:number;
  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private wr_service:WrServiceService) { 
  }
  

  ngOnInit(): void {
    this.level_name = this.ill_level.name;
    this.level_fps = this.ill_level.fps;
    this.level_id = this.ill_level.level_id.toString();
    this.level_gd_version = this.ill_level.gd_version;
    this.card_yt_videoID = this.ill_level.yt_videoID;
    this.level_creators_short = this.ill_level.creators_short;
    this.level_creators_full = this.ill_level.creators_full;
    this.level_tags = this.ill_level.tags;
    this.level_uploader = this.ill_level.uploader;
    this.level_minimal_wr_percent = this.ill_level.wr_min_percent;
    this.level_wr = this.ill_level.wr;
    this.level_wr_yt = this.ill_level.wr_yt;
    this.level_marked_for_removal = this.ill_level.marked_for_removal;
    this.level_annotated = this.ill_level.annotated;
    this.level_position = this.ill_level.position;
    this.level_gd_version = this.ill_level.gd_version;
    this.level_markdown_reason = this.ill_level.marking_reason;
    this.card_yt_vidEmbedURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.card_yt_videoID)
    this.card_yt_thumbnailURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://i.ytimg.com/vi/'+this.card_yt_videoID+'/mqdefault.jpg')
    this.level_isRated = this.level_tags.find((v) => {
      return v == "Rated"
    }) != null;
    this.level_isUnRated = this.level_tags.find((v) => {
      return v == "Previously Rated"
    }) != null;
    this.setupwideshot();
    this.addPFPs();
    this.getWRData();
  }

  async getWRData() {
    let _wrs_runs: WrSubmission[] = []
    await this.wr_service.firestore.collection('wr-sumbissions').ref
    .where('level', '==', this.ill_level.name+'-'+this.ill_level.creators_short)
    .where('status', '==', 'Approved')
    .where('isFromZero', '==', false)
    .orderBy('submitted_at', 'desc')
    .get().then(snapshot => {
      _wrs_runs = snapshot.docs.map((e:any) => {
        return e.data();
      })
    })
    
    if(_wrs_runs.length > 0) {
      this.level_wrID_run = _wrs_runs[0].$key
    }

    let _wrs_runs_0: WrSubmission[] = []
    await this.wr_service.firestore.collection('wr-sumbissions').ref
    .where('level', '==', this.ill_level.name+'-'+this.ill_level.creators_short)
    .where('status', '==', 'Approved')
    .where('isFromZero', '==', true)
    .orderBy('submitted_at', 'desc')
    .get().then(snapshot => {
      _wrs_runs_0 = snapshot.docs.map((e:any) => {
        return e.data();
      })
    })
  
    if(_wrs_runs_0.length > 0) {
      this.level_wrID_0 = _wrs_runs_0[0].$key
    }
  }

  async addPFPs() {
    let _cnt = 0;
    await this.level_creators_full.forEach(async (creator, i) => {
      let _pfp = await this.authService.getDataFromGDUsername(creator)
      if(_pfp) {
        _cnt++
        this.level_creatorAccounts.push(_pfp);
        if(_pfp?.profilePicture != null) {
          this.level_creatorPFPs.push(_pfp?.profilePicture)
          if(_cnt<=3) {
            this.level_creatorPFPs_limited.push(_pfp?.profilePicture)
          }
        }
      }
    });

  }

  scrollUp() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  async setupwideshot() {
    this.card_wideshot_link = await this.sanitizer.bypassSecurityTrustResourceUrl(''+this.ill_level.wide_level_shot_url);

    //disallow white text on light theme
    if(this.ill_level.wide_level_shot_url != '') {
      this.card_haswideshot = true;
    } else {
      this.card_haswideshot = false;
    }

  }

  expandCard() {
    if (!this.card_mobile_expanded) {
      this.card_mobile_expanded = true && window.innerWidth <= 820;
    }
    else if (this.card_mobile_expanded) {
      this.card_mobile_expanded = !(true && window.innerWidth <= 820);
    }
    if (!this.card_expanded) {
      this.card_expanded = true && window.innerWidth > 820;
    }
    else if (this.card_expanded) {
      this.card_expanded = !(true && window.innerWidth > 820);
    }
  }
}
