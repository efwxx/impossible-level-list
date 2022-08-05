import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImpossibleLevel } from 'src/app/shared/impossible-level'
import { LevelServiceService } from '../shared/level-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  levelList: ImpossibleLevel[] = [];

  levelListToDisplay: ImpossibleLevel[] = [];
  currentPage:number = 0;
  pageSize:number = 50;
  showErrorLabel:boolean = false;
  errorLabelText:string = '';
  the_end = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any> | undefined;

  listSorted:boolean = false;

  //easter eggs
  _timesClickedOnLogo:number = 0;

  constructor(private ill_service: LevelServiceService) {
  }



  ngOnInit(): void {
    this.loadLevelList();
    setTimeout(() => {
      this.reSortLevels();
      this.cutoutPage(0, this.pageSize);
    }, 1500);
  }

  cutoutPage(start:number, length:number) {
    this.listSorted = false;
    this.levelListToDisplay = [];
    for(let i=start; i<start+length && i<this.levelList.length; i++) {
      this.levelListToDisplay.push(this.levelList[i]);
    }
    this.listSorted = true;

  }

  pageFwd() {
    if(this.currentPage*this.pageSize<this.levelList.length-1) {
      this.currentPage+=1;
      this.cutoutPage(this.currentPage*this.pageSize, this.pageSize);
    } else {
      this.showErrorLabel = true;
      this.errorLabelText = 'No more pages avaliable'
      setTimeout(() => {
        this.showErrorLabel = false;
      }, 3000);
    }
  }
  
  pageBck() {
    if(this.currentPage>0) {
      this.currentPage-=1;
      this.cutoutPage(this.currentPage*this.pageSize, this.pageSize);
    } else {
      this.showErrorLabel = true;
      this.errorLabelText = 'No pages avaliable before page 0'
      setTimeout(() => {
        this.showErrorLabel = false;
      }, 3000);
    }
  }
  
  loadLevelList() {
    this.ill_service.getEntireLevelList().subscribe(res => {
      this.levelList = res.map((e:any ) => {
        const data = e.payload.doc.data();
        return data;
      })
    }, err => {
      alert(err.toString());
    });
  }
  
  reSortLevels() {
    this.levelList = this.levelList.sort((a, b) => { return a.position - b.position});
    this.listSorted = true;
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
}
