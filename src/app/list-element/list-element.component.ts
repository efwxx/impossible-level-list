import { RouterModule, Routes } from '@angular/router';

import { Component, Inject, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { LevelServiceService } from 'src/app/shared/level-service.service'
import { ImpossibleLevel } from '../shared/impossible-level'
import { Attribute } from '@angular/compiler';


@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css']
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
  level_playtester_main = "Hipo";
  level_playtesters_full = [
    'Hipo',
    'OrbPerson',
    'Melting Ice',
    'Xane'
  ]
  level_id = '77018514'; //Write Unreleased if not given
  level_gd_version = '2.1';

  card_expanded = false;
  card_yt_videoID = 'DqB2uTY9-Ss'
  card_yt_vidEmbedURL;

  //all data in 1 object
  

  @Input('ill_level') ill_level:ImpossibleLevel | undefined ;
  constructor(private sanitizer: DomSanitizer) { 
    this.card_yt_vidEmbedURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.card_yt_videoID)
    
    //copy data
  }
  

  ngOnInit(): void {
  }

  expandCard() {
    if(!this.card_expanded) {
      this.card_expanded = true;
    } else {
      this.card_expanded = false;
    }
  }
}
