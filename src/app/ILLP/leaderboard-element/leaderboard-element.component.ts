import { Component, Input, OnInit } from '@angular/core';
import { faHammer, faPlus, faStar, faTools, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserData } from 'src/app/shared/user-data';

@Component({
  selector: 'app-leaderboard-element',
  templateUrl: './leaderboard-element.component.html',
  styleUrls: ['./leaderboard-element.component.css']
})
export class LeaderboardElementComponent implements OnInit {

  i_user = faUser;
  i_cup = faTrophy;
  i_star = faStar;
  i_plus = faPlus;
  i_creator = faHammer;
  i_count = faTools

  @Input('user') user:UserData = {
    email: '',
    roles: {
      
    }
  };

  constructor() { }

  ngOnInit(): void {
  }


}
