import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImpossibleLevel } from 'src/app/shared/impossible-level'
import { LevelServiceService } from '../shared/level-service.service';
import {
  faArrowLeft,
  faArrowRight,
  faBacon,
  faBarsStaggered,
  faBiohazard,
  faBolt,
  faBone,
  faBong,
  faBugSlash,
  faChair,
  faClipboardCheck,
  faCloudMoon,
  faCode,
  faCodeBranch,
  faCrown,
  faDatabase,
  faDragon,
  faEye,
  faHurricane,
  faLock,
  faMound,
  faP,
  faPeopleGroup,
  faPoo,
  faScrewdriverWrench,
  faShieldCat,
  faSkull,
  faSortDown,
  faSpa,
  faTag,
  faTerminal,
  faTractor,
  faUser,
  faWaveSquare
} from '@fortawesome/free-solid-svg-icons'
import { formatNumber } from '@angular/common';
import { faXing, faYandex } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  levelList: ImpossibleLevel[] = [];

  levelListToDisplay: ImpossibleLevel[] = [];
  currentPage:number = 1;
  pageSize:number = 100;
  showErrorLabel:boolean = false;
  errorLabelText:string = '';
  the_end = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any> | undefined;

  listSorted:boolean = false;

  //easter eggs
  _timesClickedOnLogo:number = 0;

  //search
  srch_input: string = '';
  srch_criteria: string = 'name';
  srch_dropdown: boolean = false;
  srch_showingSearchResults: boolean = false;

  _currentTheme = localStorage['theme'];

  //icons
  i_name = faDatabase;
  i_tag = faTag;
  i_creator = faScrewdriverWrench;
  i_version = faCodeBranch;
  i_id = faBarsStaggered;
  i_arrLeft = faArrowLeft;
  i_arrRight = faArrowRight;
  i_expand = faSortDown;
  i_addition = faClipboardCheck;
  i_bugfix = faBugSlash;

  //user icons
  i_MateussDev = faCode;
  i_Locked101 = faLock;
  i_sequoia = faSkull;
  i_Numb = faSpa;
  i_Trin = faBong;
  i_maus999 = faTractor;
  i_Pamka = faP
  i_Wuro = faShieldCat;
  i_Tomejito = faMound;
  i_skele = faBone;
  i_Relayne = faYandex;
  i_AuraXalaiv = faDragon;
  i_Eightos = faPoo;
  i_skub = faBacon;
  i_krx = faTerminal;
  i_Akyse = faCloudMoon;
  i_Remy = faPeopleGroup;
  i_PhiPan = faHurricane;
  i_doki = faCrown;
  i_Xane = faXing;
  i_knali = faEye;

  constructor(private ill_service: LevelServiceService) {
  }



  async ngOnInit() {
    this.cutoutPage(0, this.pageSize);
  }

  async cutoutPage(start:number, end:number) {
    this.levelListToDisplay = [];
    this.srch_showingSearchResults = false;
    this.listSorted = false;
    console.log("Showing page starting from", start, "->", end)
    await this.ill_service.getOrderedLevelPage(start, end).then(snapshot => {
      this.levelListToDisplay = snapshot.docs.map((e:any) => {
        const data = e.data();
        return data;
      })
    }).catch(err => {
      console.log(err);
    })
    this.listSorted = true;
  }

  pageFwd() {
    console.log('Moving forward')
    this.currentPage+=1;
    console.log("loading elements from", (this.currentPage-1)*this.pageSize,"to", ((this.currentPage-1)*this.pageSize)+this.pageSize)
    this.cutoutPage((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  
  pageBck() {
    console.log('Moving back')
    if(this.currentPage>1) {
      this.currentPage-=1;
      console.log("loading elements from", (this.currentPage-1)*this.pageSize,"to", ((this.currentPage-1)*this.pageSize)+this.pageSize)
      this.cutoutPage((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      this.showErrorLabel = true;
      this.errorLabelText = 'No pages avaliable before page 0'
      setTimeout(() => {
        this.showErrorLabel = false;
      }, 3000);
    }
  }
  
  async loadLevelList() {
    this.ill_service.getOrderedLevelList().then(snapshot => {
      this.levelList = snapshot.docs.map((e:any) => {
        const data = e.data();
        return data;
      })
    }).catch(err => {
      console.log(err);
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  log() {
    console.log(this.levelListToDisplay);
  }

  increaseEasterEgg() {
    this._timesClickedOnLogo++;
    if(this._timesClickedOnLogo == 25) {
      alert('What are you doing?')
    }
    if(this._timesClickedOnLogo == 50) {
      alert('Stop it')
    }
    if(this._timesClickedOnLogo == 75) {
      alert('Ur gonna break the website')
    }
    if(this._timesClickedOnLogo == 100) {
      alert('Man for real stop this')
    }
    if(this._timesClickedOnLogo == 125) {
      alert("It's not funny anymore")
    }
    if(this._timesClickedOnLogo == 149) {
      alert("From now on I will always say sloom when you click on the logo. I'm tired of you spamming it")
    }
    if(this._timesClickedOnLogo >= 150 && this._timesClickedOnLogo < 175) {
      alert("sloom")
    }
    if(this._timesClickedOnLogo == 175) {
      alert("Do you even have a life?")
    }
    if(this._timesClickedOnLogo == 200) {
      alert("Go outside")
    }
  }

  toggleSearchDropdown() {
    if(this.srch_dropdown) {
      this.srch_dropdown = false;
    } else {
      this.srch_dropdown = true;
    }
  }

  selectCriteria(crit:string) {
    this.srch_criteria = crit;
    this.srch_dropdown = false;
  }

  async search(crit:string, input:string) {
    this.listSorted = false;
    this.levelList = [];
    this.srch_showingSearchResults = true;
    console.log('begin search')
    //make sure that nameLowercase exists

    switch (crit) {
      case 'name':
        console.log('searching through names')
        await this.ill_service.firestore.collection('ill').ref.where('name', '==', input).orderBy('position').get().then(res => {
          this.levelListToDisplay = res.docs.map((e:any) => {
            const data = e.data();
            return data;
          })
        }).catch(err => {
          this.listSorted = true;
          console.log(err);
        })
        this.listSorted = true;
        break;
      case 'id':
        console.log('searching through normal fields')
        await this.ill_service.firestore.collection('ill').ref.where('level_id', '==', input).orderBy('position').get().then(res => {
          this.levelListToDisplay = res.docs.map((e:any) => {
            const data = e.data();
            return data;
          })
        }).catch(err => {
          this.listSorted = true;
          console.log(err);
        })
        this.listSorted = true;
        break;
      case 'update':
        console.log('searching through normal fields')
        await this.ill_service.firestore.collection('ill').ref.where('gd_version', '==', input).orderBy('position').get().then(res => {
          this.levelListToDisplay = res.docs.map((e:any) => {
            const data = e.data();
            return data;
          })
        }).catch(err => {
          this.listSorted = true;
          console.log(err);
        })
        this.listSorted = true;
        break;
      case 'creator':
        console.log('earching through array fields')
        await this.ill_service.firestore.collection('ill').ref.where('creators_full', 'array-contains', input).orderBy('position').get().then(res => {
          this.levelListToDisplay = res.docs.map((e:any) => {
            const data = e.data();
            return data;
          })
        }).catch(err => {
          this.listSorted = true;
          console.log(err);
        })
        this.listSorted = true;
        break;
      case 'tag':
        console.log('earching through array fields')
        if(this.srch_input != 'No Victors') {
          await this.ill_service.firestore.collection('ill').ref.where('tags', 'array-contains', input).orderBy('position').get().then(res => {
            this.levelListToDisplay = res.docs.map((e:any) => {
              const data = e.data();
              return data;
            })
          }).catch(err => {
            this.listSorted = true;
            console.log(err);
          })
          this.listSorted = true;
          break;
        } else {
          this.levelListToDisplay = [];
          console.log('LMFAO')
          this.listSorted = true;
          break;
        }
      
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}
