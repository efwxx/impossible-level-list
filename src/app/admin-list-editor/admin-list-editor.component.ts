import { Component, OnInit } from '@angular/core';
import { ImpossibleLevel } from '../shared/impossible-level';
import { LevelServiceService } from '../shared/level-service.service';


@Component({
  selector: 'app-admin-list-editor',
  templateUrl: './admin-list-editor.component.html',
  styleUrls: ['./admin-list-editor.component.css']
})
export class AdminListEditorComponent implements OnInit {

  levelList: ImpossibleLevel[] = [];

  constructor(public ill_service: LevelServiceService) { }

  ngOnInit(): void {
    this.refreshLevelList();
  }

  refreshLevelList() {
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
}
