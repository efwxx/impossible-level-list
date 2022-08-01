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

  constructor(private levelService: LevelServiceService) { }
  ill: ImpossibleLevel[] = [];
  getList = () => this.levelService.getList().subscribe();

  ngOnInit(): void {
    this.loadLevelList(1);
  }
  logLevelList() {
    console.log(this.ill);
  }

  loadLevelList(length: number) {
    for(let i=0; i<length; i++) {
      
    }
  }
  
}
