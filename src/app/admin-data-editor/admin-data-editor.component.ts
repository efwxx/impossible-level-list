import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  bil_reason:string = ''; //reason for markdown

  bil_index:number = 1;

  auditLog:string[] = [];

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
  bli_buffer:ImpossibleLevel = {
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
  }

  lb_editStatus:string = 'Empty form'
  levelList: ImpossibleLevel[] = [];

  constructor(public ill_service:LevelServiceService, private auth_service: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.refreshLevelListArray();
    setTimeout(() => {
      this.reSortLevels();
    }, 1000);

    //handle admin
    
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
    this.bil_index = 0;
  }
  
  submitLevel() {
    this.packageLevel(); //package data to object
    this.lb_editStatus = 'Sending level to database...'
    let matchingLevel = this.levelList.find((arr_level) => {
      return arr_level.name == this.bil_packaged.name && arr_level.creators_short == this.bil_packaged.creators_short;
    }); //check for existing level with same name/creator
    if(matchingLevel == undefined) {
      this.levelList.splice(this.bil_index-1, 0, this.bil_packaged) //insert the level using splice
      this.ill_service.addLevel(this.bil_packaged).then(res => { //add level to database
        console.log(res);
      }).catch(error => {
        this.lb_editStatus = error.toString();
      });
      this.lb_editStatus = 'Successfully added level!'
      this.auditLog.push('Added level '+this.bil_packaged.name+' at #'+this.bil_index);
    } else {
      let matchingLevelIndex = this.levelList.findIndex((arr_level) => {
        return arr_level.name == this.bil_packaged.name && arr_level.creators_short == this.bil_packaged.creators_short;
      });
      this.bil_packaged.id = matchingLevel.id;
      this.levelList[matchingLevelIndex] = this.bil_packaged;
      this.ill_service.updateLevel(this.bil_packaged);
      this.lb_editStatus = 'Successfully updated level!'
      this.auditLog.push('Updated data for level '+this.bil_packaged.name);
    }
    setTimeout(() => {
      this.reSortLevels();
    }, 333)
  }
  
  
  refreshLevelListArray() {
    this.ill_service.getEntireLevelList().subscribe(res => {
      this.levelList = res.map((e:any ) => {
        const data = e.payload.doc.data();
        return data;
      })
    }, err => {
      alert(err.toString());
    })
  }
  
  
  remapLevels() {
    let _changes = 0;
    this.lb_editStatus = 'Re-mapping level positions...'
    for(let i=0; i<this.levelList.length; i++) {
      console.log(this.levelList[i].position, '=>', i+1) //compare
      if(this.levelList[i].position != i+1) {
        console.log('error in '+this.levelList[i].name+"'s position... fixing...")
        this.levelList[i].position = i+1;
        console.log(this.levelList[i].position, '->', i+1);
        if(this.levelList[i].position != i+1) {
          console.log('Failed to fix '+this.levelList[i].name+"'s level position")
        } else {
          console.log('Fixing of '+this.levelList[i].name+" complete... Updating level...")
          this.ill_service.updateLevel(this.levelList[i]);
          _changes++;
        }
      }
      
    }
    this.lb_editStatus = 'Re-mapping complete: '+_changes+' changes'
  }
  
  reSortLevels() {
    this.lb_editStatus = 'Re-sorting level list based on positions...'
    this.levelList = this.levelList.sort((a, b) => { return a.position - b.position});
    this.lb_editStatus = 'Re-sorting complete!'
  }

  packageLevel() {
    this.lb_editStatus = 'Packaging level...'
    
    //Packing normal values
    this.bil_packaged.name = this.bil_name;
    this.bil_packaged.fps = this.bil_fps;
    this.bil_packaged.level_id = this.bil_id;
    this.bil_packaged.gd_version = this.bil_gdv;
    this.bil_packaged.creators_short = this.bil_c_s;
    this.bil_packaged.uploader = this.bil_upld;
    this.bil_packaged.wr_min_percent = this.bil_wr_min;
    this.bil_packaged.wr_yt = this.bil_wr_yt;
    this.bil_packaged.wr = this.bil_wr;
    this.bil_packaged.marked_for_removal = this.bil_removal;
    this.bil_packaged.annotated = this.bil_annotation;
    this.bil_packaged.position = this.bil_index;
    
    //packing arrays
    this.bil_packaged.creators_full = this.bil_c_f.split(",");
    this.bil_packaged.tags = this.bil_tags.split(",");

    //removal of URL
    this.bil_packaged.yt_videoID = this.bil_ytid.replace('youtube.com/watch?v=', '').replace('https://','').replace('www.','').replace('youtu.be/','');
    
    console.log(this.bil_packaged);
  }
  
  logLevelArray() {
    console.log(this.levelList);
  }
  
  loadDataFromLevel(level:ImpossibleLevel) {
    let matchingLevel = this.levelList.find((arr_level) => {
      return arr_level.name == level.name && arr_level.creators_short == level.creators_short;
    });
    console.log(matchingLevel);
    if(matchingLevel == undefined) {
      this.lb_editStatus = 'No Matching level found'
    } else {
      this.bli_buffer = matchingLevel;

      this.bil_name = this.bli_buffer.name;
      this.bil_c_s = this.bli_buffer.creators_short;
      this.bil_index = this.bli_buffer.position;
      this.bil_fps = this.bli_buffer.fps;
      this.bil_gdv = this.bli_buffer.gd_version;
      this.bil_ytid = this.bli_buffer.yt_videoID;
      this.bil_id = this.bli_buffer.level_id;
      this.bil_upld = this.bli_buffer.uploader;
      this.bil_wr_min = this.bli_buffer.wr_min_percent;
      this.bil_wr_yt = this.bli_buffer.wr_yt;
      this.bil_wr = this.bli_buffer.wr;
      this.bil_removal = this.bli_buffer.marked_for_removal;
      this.bil_annotation = this.bli_buffer.annotated;
      this.bil_reason = this.bli_buffer.marking_reason;

      this.bil_c_f = this.bli_buffer.creators_full.toString()
      this.bil_tags = this.bli_buffer.tags.toString()

      this.bil_removal = this.bli_buffer.marked_for_removal;
      this.bil_annotation = this.bli_buffer.annotated;
      this.lb_editStatus = 'Data loaded';
    }
  }
  
  removeLevel() {
    this.refreshLevelListArray();
    this.packageLevel()
    let matchingLevel = this.levelList.find((arr_level) => {
      return arr_level.name == this.bil_packaged.name && arr_level.creators_short == this.bil_packaged.creators_short;
    });
    if(matchingLevel == undefined) {
      this.lb_editStatus = 'No Matching level found'
    } else {
      this.ill_service.deleteLevel(matchingLevel);
      this.lb_editStatus = 'Removed Level successfully!'
    }
  }


}
