import { Component, OnInit } from '@angular/core';
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
  getList = () => this.levelService.getList().subscribe(res => (this.ill = res));

  ngOnInit(): void {
    this.getList();
    console.log(this.ill);
  }
  
  
}
