import { RouterModule, Routes } from '@angular/router';

import { Component, Inject, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  level_markdown_reason = ''

  card_expanded = false;
  card_yt_videoID = 'DqB2uTY9-Ss'
  card_yt_vidEmbedURL: SafeResourceUrl | undefined;
  card_yt_thumbnailURL: SafeResourceUrl | undefined;

  //all data in 1 object
  

  @Input('ill_level') ill_level:ImpossibleLevel = {
    id: '',
    position: 0,
    name: '',
    fps: 0,
    level_id: '',
    gd_version: '',
    yt_videoID: '',
    creators_short: '',
    creators_full: [],
    tags: [],
    uploader: '',
    wr_min_percent: '',
    wr: '',
    wr_yt: '',
    marked_for_removal: false,
    annotated: false,
    marking_reason: ''
  };
  @Input('ill_position') ill_position?:number;
  constructor(private sanitizer: DomSanitizer) { 
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
    this.card_yt_thumbnailURL = this.sanitizer.bypassSecurityTrustResourceUrl('http://img.youtube.com/vi/'+this.card_yt_videoID+'/sddefault.jpg')
  }

  expandCard() {
    if(!this.card_expanded) {
      this.card_expanded = true;
    } else {
      this.card_expanded = false;
    }
  }
}
