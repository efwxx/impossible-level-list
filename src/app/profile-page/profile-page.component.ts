import { Component, OnInit } from '@angular/core';
import { LevelServiceService } from '../shared/level-service.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
