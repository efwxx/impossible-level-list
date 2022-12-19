import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImpossibleLevel } from 'src/app/shared/impossible-level'
import { LevelServiceService } from '../../shared/level-service.service';
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
  faCat,
  faChair,
  faChild,
  faChildRifle,
  faClipboardCheck,
  faCloudMoon,
  faCode,
  faCodeBranch,
  faCrown,
  faDatabase,
  faDragon,
  faEye,
  faHourglass,
  faHurricane,
  faInfinity,
  faLightbulb,
  faLock,
  faMound,
  faP,
  faPeopleGroup,
  faPoo,
  faScrewdriverWrench,
  faSearch,
  faShieldCat,
  faSkull,
  faSortDown,
  faSpa,
  faStar,
  faTag,
  faTerminal,
  faTooth,
  faTractor,
  faUmbrella,
  faUpRightFromSquare,
  faUser,
  faWaveSquare,
  faYinYang
} from '@fortawesome/free-solid-svg-icons'
import { formatNumber } from '@angular/common';
import { faUmbraco, faXing, faYandex } from '@fortawesome/free-brands-svg-icons';

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

  ill_allFacts:any[] = [];
  ill_randomFact:string = '';

  //easter eggs
  _timesClickedOnLogo:number = 0;

  //search
  srch_input: string = '';
  srch_criteria: string = 'level name';
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
  i_fps = faHourglass;
  i_illrf = faStar;
  i_search = faSearch;
  i_link = faUpRightFromSquare;

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
  i_skub = faCat;
  i_krx = faTerminal;
  i_Akyse = faCloudMoon;
  i_Remy = faPeopleGroup;
  i_PhiPan = faHurricane;
  i_doki = faCrown;
  i_Xane = faXing;
  i_knali = faEye;
  i_buk = faLightbulb;
  i_blanket = faTooth;
  i_ewe = faYinYang;
  i_zodiac = faUmbrella;
  i_sobot = faChildRifle;
  i_alex = faInfinity;

  constructor(private ill_service: LevelServiceService) {
  }



  async ngOnInit() {
    this.cutoutPage(0, this.pageSize);


    // this.listSorted = true;

    
    this.getRandomILLFact();
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

  async search(input:string) {
    this.listSorted = false;
    this.levelList = [];
    this.srch_showingSearchResults = true;

    let finalList:ImpossibleLevel[] = [];
    let _tempArr:ImpossibleLevel[] = [];
    console.log('begin search')
    //make sure that nameLowercase exists

    if(input == "") {
      this.cutoutPage(0, this.pageSize);
      return;
    } else if(input == "lennard") {
      _tempArr = [];
      console.log('LENNAR')
      this.listSorted = true;
      return;
    }
    // ! Search through all level names:

    //reset the temp array holding the data
    _tempArr = [];

    // * query normal names
      console.log('searching through normal case level names')
      await this.ill_service.firestore.collection('ill').ref.where('name', '==', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      });
      finalList.concat(_tempArr);

    // * query lowercase names
      console.log('searching through lowercase level names')
      await this.ill_service.firestore.collection('ill').ref.where('nameLowercase', '==', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      });

    // * add to the final list
      finalList = finalList.concat(_tempArr);

    // ! Search through all level IDs

    //reset the temp array
      _tempArr = [];

      console.log('searching through level IDs')
      await this.ill_service.firestore.collection('ill').ref.where('level_id', '==', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })

    // * add to the final list
      finalList = finalList.concat(_tempArr);

    // ! Search through all GD versions

    //reset temp array
      _tempArr = [];

      console.log('searching through GD versions')
      await this.ill_service.firestore.collection('ill').ref.where('gd_version', '==', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })

    // * add to the final list
      finalList = finalList.concat(_tempArr);

    // ! Search through all FPS values

    //reset temp array
      _tempArr = [];

      console.log('searching through all fps values')
      await this.ill_service.firestore.collection('ill').ref.where('fps', '==', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })

    // * add to the final list
      finalList = finalList.concat(_tempArr);
    
    // ! Search through all creators

    //reset temp array
      _tempArr = [];

    // * query normal name of creator
      console.log('searching through normal case creator array fields')
      await this.ill_service.firestore.collection('ill').ref.where('creators_full', 'array-contains', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })
    
    // * add to the final list
      finalList = finalList.concat(_tempArr);
    
    // * query lowercase name of creator
      console.log('searching through lowercase creator array fields')
      await this.ill_service.firestore.collection('ill').ref.where('creators_full_lowercase', 'array-contains', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })

    // * add to the final list
      finalList = finalList.concat(_tempArr);

    // ! Search through all tags

    //reset temp array
      _tempArr = [];

      console.log('searching through normal tag array fields')
      await this.ill_service.firestore.collection('ill').ref.where('tags', 'array-contains', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })

    // * add to the final list
      finalList = finalList.concat(_tempArr);
    
      console.log('searching through lowercase tag array fields')
      await this.ill_service.firestore.collection('ill').ref.where('tagsLowercase', 'array-contains', input).orderBy('position').get().then(res => {
        _tempArr = res.docs.map((e:any) => {
          const data = e.data();
          return data;
        })
      }).catch(err => {
        this.listSorted = true;
        console.log(err);
      })
    // * add to the final list
      finalList = finalList.concat(_tempArr);
      
    // ! Remove duplicates
    

    //seek
    for(let i=finalList.length; i>0; i--) {
      for(let j=0; j<finalList.length; j++) {
        if(i!=j) {
          if(finalList[i] != undefined && finalList[j] != undefined) {
            if(finalList[i].name == finalList[j].name && finalList[i].creators_short == finalList[j].creators_short) {
              console.log("duplicate found: ", finalList[i].name,"by",finalList[i].creators_short);
              finalList.splice(i, 1);
            }
          }
        }
      }
    }

    

    // ! Finalize full Query
      this.levelListToDisplay = finalList;
      this.listSorted = true;
    
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  async getRandomILLFact() {
    //get all facts
    await this.ill_service.firestore.collection('facts').ref.get().then(snapshot => {
      this.ill_allFacts = snapshot.docs.map((e:any) => {
        const data = e.data();
        return data;
      })
    })

    console.log(this.ill_allFacts);
    //select random fact
    this.ill_randomFact = this.ill_allFacts[Math.floor(Math.random()*this.ill_allFacts.length)].fact;
  }
}
