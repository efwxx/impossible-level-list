import { Component, OnInit } from '@angular/core';
import { ImpossibleLevel } from '../shared/impossible-level';

import { LevelServiceService } from '../shared/level-service.service';

@Component({
  selector: 'app-admin-data-editor',
  templateUrl: './admin-data-editor.component.html',
  styleUrls: ['./admin-data-editor.component.css']
})
export class AdminDataEditorComponent implements OnInit {

  bil_name:string = ''
  bil_fps:number = 0
  bil_id:string = ''
  bil_gdv:string = '' //Gd version
  bil_ytid:string = '' //Youtube video id
  bil_c_s:string = '' //Creators short
  bil_c_f:string = '' //Creators full
  bil_tags:string = ''
  bil_upld:string = '' //Uploader
  bil_wr_min:string = ''
  bil_wr_yt:string = ''
  bil_wr:string = ''
  bil_removal:boolean = false
  bil_annotation:boolean = false

  bil_index:number | undefined = 1;

  bil_packaged:ImpossibleLevel = {
    id: '',
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
    marking_reason: '',
    position: 0
  }

  lb_editStatus:string = 'Empty form'
  levelList: ImpossibleLevel[] = [];

  constructor(public ill_service:LevelServiceService) { }

  ngOnInit(): void {
  }

  clearForm() {
    this.bil_name = '';
    this.bil_fps = 0;
    this.bil_gdv = '';
    this.bil_ytid = '';
    this.bil_c_s = '';
    this.bil_c_f = '';
    this.bil_tags = '';
    this.bil_upld = '';
    this.bil_wr_min = '';
    this.bil_wr_yt = '';
    this.bil_wr = '';
    this.bil_removal = false;
    this.bil_annotation = false;
    this.bil_index = undefined;
  }
  
  submitLevel() {
    this.packageLevel(); //package data to object
    this.lb_editStatus = 'Sending level to database...'
    this.ill_service.addLevel(this.bil_packaged).then(res => {
      console.log(res);
    }).catch(error => {
      this.lb_editStatus = error.toString();
    });
    this.remapLevels();
    this.lb_editStatus = 'Success!'
  }
  
  
  refreshLevelListArray() {
    this.ill_service.getEntireLevelList().subscribe(res => {
      this.levelList = res.map((e:any ) => {
        const data = e.payload.doc.data();
        data.id = e.payload.id;
        return data;
      })
    }, err => {
      alert(err.toString());
    })
  }
  
  
  remapLevels() {
    let _changes = 0;
    this.lb_editStatus = 'Re-mapping level positions...'
    this.refreshLevelListArray(); //get latest array
    this.levelList.sort((a, b) => { //sort array by position
      return a.position - b.position
    });
    this.levelList.forEach((level, i) => { 
      if(level.position != i) {
        level.position = i; //remap position if incorrect position
        console.log('re-mapped '+level.name+' to #'+level.position)
        _changes++;
        this.ill_service.updateLevel(level).then(res => {
          console.log(res);
        }).catch(error => {
          this.lb_editStatus = error.toString();
        }); //update the level
      }
    });
    this.lb_editStatus = 'Re-mapping complete, '+_changes+' changes'
  }

  packageLevel() {
    this.lb_editStatus = 'Packaging level...'

    //Packing normal values
    this.bil_packaged.name = this.bil_name;
    this.bil_packaged.fps = this.bil_fps;
    this.bil_packaged.gd_version = this.bil_gdv;
    this.bil_packaged.yt_videoID = this.bil_ytid;
    this.bil_packaged.creators_short = this.bil_c_s;
    this.bil_packaged.uploader = this.bil_upld;
    this.bil_packaged.wr_min_percent = this.bil_wr_min;
    this.bil_packaged.wr_yt = this.bil_wr_yt;
    this.bil_packaged.wr = this.bil_wr;
    this.bil_packaged.marked_for_removal = this.bil_removal;
    this.bil_packaged.annotated = this.bil_annotation;

    //packing arrays
    this.bil_packaged.creators_full = this.bil_c_f.split(",");
    this.bil_packaged.tags = this.bil_tags.split(",");

    console.log(this.bil_packaged);
  }

  loadDataFromLevel() {
    const matchingNames = this.ill_service.firestore.collection('ill').ref.where('name', '==', this.bil_name).where('creators_short', '==', this.bil_c_s).get();
    
  }
}
