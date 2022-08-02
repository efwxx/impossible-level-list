import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImpossibleLevel } from 'src/app/shared/impossible-level'
import { LevelServiceService } from '../shared/level-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private ill_service: LevelServiceService) { }
  levelList: ImpossibleLevel[] = [];

  ngOnInit(): void {
    this.loadLevelList();
  }

  loadLevelList() {
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
