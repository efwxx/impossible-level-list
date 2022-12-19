import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-elem',
  templateUrl: './role-elem.component.html',
  styleUrls: ['./role-elem.component.css']
})
export class RoleElemComponent implements OnInit {

  @Input('roleName') roleName?:string;

  roleColors:string[] = [
    '#d4d4d8', //normal member
    '#fdba74', //VIP member
    '#f43f5e', //creator
    '#818cf8', //botter
    '#2dd4bf', //recorder
    '#84cc16', //ADMIN
    '#0f766e' //Developer
  ];
  colInUse:number = 0;

  constructor() { }

  ngOnInit(): void {
    switch(this.roleName) {
      case 'Member':
        this.colInUse = 0;
        break;
      case 'VIP Member':
        this.colInUse = 1;
        break;
      case 'Creator':
        this.colInUse = 2;
        break;
      case 'Botter':
        this.colInUse = 3;
        break;
      case 'Recorder':
        this.colInUse = 4;
        break;
      case 'Admin':
        this.colInUse = 5;
        break;
      case 'Developer':
        this.colInUse = 6;
        break;
    }
  }

}
