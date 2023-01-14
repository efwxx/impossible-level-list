import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImpossibleLevel } from 'src/app/shared/impossible-level'
import { LevelServiceService } from '../../shared/level-service.service';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faArrowLeft,
  faArrowRight,
  faBacon,
  faBarsStaggered,
  faBiohazard,
  faBolt,
  faBone,
  faBong,
  faBorderAll,
  faBugSlash,
  faCat,
  faChair,
  faChild,
  faChildRifle,
  faClipboardCheck,
  faClock,
  faCloudMoon,
  faCode,
  faCodeBranch,
  faCrown,
  faDatabase,
  faDragon,
  faEye,
  faFilter,
  faHourglass,
  faHurricane,
  faImage,
  faInfinity,
  faLightbulb,
  faListOl,
  faLock,
  faMound,
  faP,
  faPeopleGroup,
  faPlus,
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
  _ill: ImpossibleLevel[] = [];
  _ill_results: ImpossibleLevel[] = [];
  srch_input: string = '';
  srch_criteria: string = 'any';
  srch_dropdown: boolean = false;
  srch_showingSearchResults: boolean = false;
  srch_sortBy: string = 'position';
  srch_tags: string[] = [];
  srch_possibleTags: string[] = [
    "2p",
    "Unnerfed",
    "Old Version",
    "Fix required"
  ];
  srch_finalPage:boolean = false;

  _currentTheme = localStorage['theme'];

  //icons
  i_name = faDatabase;
  i_tag = faTag;
  i_creator = faScrewdriverWrench;
  i_version = faCodeBranch;
  i_id = faBarsStaggered;
  i_arrLeft = faAngleLeft;
  i_arrRight = faAngleRight;
  i_doublearrowLeft = faAnglesLeft;
  i_doublearrowRight = faAnglesRight;
  i_expand = faSortDown;
  i_addition = faClipboardCheck;
  i_bugfix = faBugSlash;
  i_fps = faHourglass;
  i_illrf = faStar;
  i_search = faSearch;
  i_link = faUpRightFromSquare;
  i_plus = faPlus;
  i_position = faListOl
  i_time = faClock;
  i_any = faBorderAll;
  i_sort = faFilter;

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
  i_moonfrost = faImage;

  url_banner:any = ''

  constructor(private ill_service: LevelServiceService) {
  }



  async ngOnInit() {
    this.initList()
  }


  async initList() {
    await this.getILLForSearch();
    this.cutPagev2(0, this.pageSize);


    // this.listSorted = true;

    
    this.getRandomILLFact();
    this.getBanner();
  }

  async getBanner() {
    await this.ill_service.firestore.collection('banners').ref.where('isPicked', '==', true).get().then(snapshot => {
      let _temp = snapshot.docs.map((e:any) => { return e.data() })
      this.url_banner = _temp[0].url
      
    })
  }

  async getILLForSearch() {
    this._ill = [];
    await this.ill_service.getOrderedLevelList().then(snapshot => {
      this._ill = snapshot.docs.map((doc:any) => {
        return doc.data();
      })
    });
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
  
  cutPagev2(start:number, end:number) {
    let _temp_ill = this._ill.map((e) => { return e })
    this.listSorted = false;
    _temp_ill.splice(0, start) //remove start
    _temp_ill.splice(end) //remove end
    this.levelListToDisplay = _temp_ill;
    this.listSorted = true;
  }

  cutSrchPagev2(start:number, end:number, array:ImpossibleLevel[]) {
    let _temp_ill = array.map((e) => { return e })
    this.listSorted = false;
    _temp_ill.splice(0, start) //remove start
    _temp_ill.splice(end) //remove end
    this.levelListToDisplay = _temp_ill;
    this.listSorted = true;
  }

  pageFwd() {
    console.log('Moving forward')
    if(this.srch_showingSearchResults) {
      if(this.currentPage < this._ill_results.length / this.pageSize) {
        this.srch_finalPage = false;
        this.currentPage+=1;
        console.log("loading elements from", (this.currentPage-1)*this.pageSize,"to", ((this.currentPage-1)*this.pageSize)+this.pageSize)
        this.cutSrchPagev2((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize, this._ill_results);
      } else {
        this.srch_finalPage = true;
        this.showErrorLabel = true;
        this.errorLabelText = 'Error - final page reached'
        setTimeout(() => {
          this.showErrorLabel = false;
        }, 3000);
      }
    } else {
      if(this.currentPage < this._ill.length / this.pageSize) {
        this.currentPage+=1;
        console.log("loading elements from", (this.currentPage-1)*this.pageSize,"to", ((this.currentPage-1)*this.pageSize)+this.pageSize)
        this.cutPagev2((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize);
      } else {
        this.showErrorLabel = true;
        this.errorLabelText = 'Error - final page reached'
        setTimeout(() => {
          this.showErrorLabel = false;
        }, 3000);
      }
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  
  pageBck() {
    console.log('Moving back')
    this.srch_finalPage = false;
    if(this.currentPage>1) {
      this.currentPage-=1;
      console.log("loading elements from", (this.currentPage-1)*this.pageSize,"to", ((this.currentPage-1)*this.pageSize)+this.pageSize)
      if(this.srch_showingSearchResults) {
        this.cutSrchPagev2((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize, this._ill_results);
      } else {
        this.cutPagev2((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize);
      }
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

  pageFirst() {
    this.srch_finalPage = false;
    this.currentPage = 1;
    if(this.srch_showingSearchResults) {
      this.cutSrchPagev2(0, this.pageSize, this._ill_results);
    } else {
      this.cutPagev2(0, this.pageSize);
    }
  }


  pageLast() {
    this.srch_finalPage = false;
    if(this.srch_showingSearchResults) {
      this.currentPage = Math.floor(this._ill_results.length / this.pageSize)+1;
      this.cutSrchPagev2((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize, this._ill_results);
    } else {
      this.currentPage = Math.floor(this._ill.length / this.pageSize)+1;
      this.cutPagev2((this.currentPage-1)*this.pageSize, ((this.currentPage-1)*this.pageSize)+this.pageSize);

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
  }

  selectSort(sort:string) {
    this.srch_sortBy = sort;
  }

  toggleTag(tag:string) {
    let _idx = this.srch_tags.findIndex(x => x == tag)
    if(_idx == -1) {
      this.srch_tags.push(tag);
    } else {
      this.srch_tags.splice(_idx, 1)
    }
  }

  hasTag(tag:string):boolean {
    return this.srch_tags.indexOf(tag)!= -1;
  }

  async search_v2(prompt:string, criteria:string, matchTags:string[], sortBy?:string) {
    
    if(prompt == undefined || prompt == "" || prompt.length <= 1) {
      this.cutPagev2(0, this.pageSize);
    } else {
      //Hide to show it's doing smth
      this.listSorted = false;
      this.levelListToDisplay = [];
      this.srch_showingSearchResults = true;
  
      
  
      // * Do fetching
      let _tempList:ImpossibleLevel[] = [];

      if(criteria == "any") {

        //Names
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.name.toLowerCase().includes(prompt.toLowerCase());
        }));
    
        //Fps
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.fps == Number(prompt);
        }));
    
        //GD version
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.gd_version.toLowerCase().includes(prompt.toLowerCase());
        }));
    
        //Level id
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.level_id == prompt;
        }));
    
        //Array search
    
        //Creators full
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          let _found = false;
          e.creators_full.forEach((crt, i ) => {
            if(crt.toLowerCase().includes(prompt.toLowerCase())) {
              _found = true;
            }
          });
          return _found;
        }));
        
        
      } else if(criteria = "name") {
        //Names
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.name.toLowerCase().includes(prompt.toLowerCase());
        }));
      } else if(criteria = "creator") {
        //Creators full
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          let _found = false;
          let _creatorList = e.creators_full
          _creatorList.forEach((crt, i ) => {
            console.log(1)
            if(crt.toLowerCase().includes(prompt.toLowerCase())) {
              _found = true;
            }
          });
          return !_found;
        }));

      } else if(criteria = "fps") {
        //Fps
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.fps == Number(prompt);
        }));
      } else if(criteria = "gd_version") {
        //GD version
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.gd_version.toLowerCase().includes(prompt.toLowerCase());
        }));
      } else if(criteria = "level_id") {
        //Level id
        _tempList = _tempList.concat(this._ill.filter((e:ImpossibleLevel) => {
          return e.level_id == prompt;
        }));
      }
      // * Finalize list
  
      //delete duplicates
      for(let i=_tempList.length; i>0; i--) {
        for(let j=0; j<_tempList.length; j++) {
          if(i!=j) {
            if(_tempList[i] != undefined && _tempList[j] != undefined) {
              if(_tempList[i].name == _tempList[j].name && _tempList[i].creators_short == _tempList[j].creators_short) {
                console.log("duplicate found: ", _tempList[i].name,"by",_tempList[i].creators_short);
                _tempList.splice(i, 1);
              }
            }
          }
        }
      }

      //delete unmatching tags
      if(matchTags.length > 0) {
        for(let i=0; i<matchTags.length; i++) {
          _tempList = _tempList.filter((e:ImpossibleLevel) => {
            return e.tags.indexOf(matchTags[i]) != -1;
          })
        }
      } else {
        //do nothing
      }
      
      if(sortBy == undefined || sortBy == "position") {
        //sort by position
        _tempList = _tempList.sort((a, b) => {
          return a.position - b.position;
        })
      } else if(sortBy == "fps") {
        //sort by position
        _tempList = _tempList.sort((a, b) => {
          return Number(b.fps) - Number(a.fps);
        })
      } else if(sortBy == "level_id") {
        //sort by position
        _tempList = _tempList.sort((a, b) => {
          return Number(a.level_id) - Number(b.level_id);
        })
      }
      this._ill_results = _tempList.map((e) => { return e })
      this.cutSrchPagev2(0, this.pageSize, _tempList)
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
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
