import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { faClipboard, faHammer, faPlus, faStar, faTools, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { ImpossibleLevel } from 'src/app/shared/impossible-level';
import { LevelServiceService } from 'src/app/shared/level-service.service';
import { UserData } from 'src/app/shared/user-data';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user_data:UserData = {
    email: '',
    roles: {}
  }
  user_levels:ImpossibleLevel[] = [];
  found_user:boolean = true;

  i_user = faUser;
  i_cup = faTrophy;
  i_star = faStar;
  i_plus = faPlus;
  i_creator = faHammer;
  i_count = faTools;
  i_bio = faClipboard

  selected_mascott_name:string = '';
  selected_mascott_path:string = '';
  selected_mascotts = [
    {name: 'Sloom', path: '../../../assets/mascotts/mascott_sloom.png'},
    {name: 'Jerry', path: '../../../assets/mascotts/mascott_jerry.png'},
    {name: 'Ging', path: '../../../assets/mascotts/mascott_ging.png'},
    {name: 'Subsuming Cube', path: '../../../assets/mascotts/mascott_sc.png'},
    {name: 'Hank', path: '../../../assets/mascotts/mascott_hank.png'},
    {name: 'Relife Jump Jumping', path: '../../../assets/mascotts/mascott_relife.png'},
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private illservice: LevelServiceService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getRandomMascott();
  }

  async getUser() {
    let _uid = this.route.snapshot.paramMap.get('id');

    if(_uid) {
      let _temp_usr = await this.authService.getDataFromUID(_uid)
      if(_temp_usr) {
        this.user_data = _temp_usr;
        this.getUserLevels();
      } else {
        this.found_user = false;
      }
    }
  }

  getRandomMascott() {
    let _rng = Math.round(Math.random() * (this.selected_mascotts.length-1));
    this.selected_mascott_name = this.selected_mascotts[_rng].name
    this.selected_mascott_path = this.selected_mascotts[_rng].path
  }

  async getUserLevels() {
    await this.illservice.firestore.collection('ill').ref.where('creators_full', 'array-contains', this.user_data.gd_username).orderBy('position').get().then(snapshot => {
      this.user_levels = snapshot.docs.map((e:any) => {
        const data = e.data();
        return data;
      })
    })
  }

}
