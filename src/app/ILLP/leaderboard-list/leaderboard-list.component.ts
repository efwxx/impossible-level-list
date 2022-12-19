import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { faHammer, faPlus, faStar, faTools, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { UserData } from 'src/app/shared/user-data';


@Component({
  selector: 'app-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.css']
})
export class LeaderboardListComponent implements OnInit {

  constructor(
    public firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  i_user = faUser;
  i_cup = faTrophy;
  i_star = faStar;
  i_plus = faPlus;
  i_creator = faHammer;
  i_count = faTools;

  userList: UserData[] = []
  listLoaded: boolean = false;

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.listLoaded = false;
    const coll = this.firestore.collection('user').ref
      .orderBy('ill_points', 'desc')
      .where("show_in_leaderboards", '==', true)
      .where("ill_points", '>', 0)

    coll.get().then(snapshot => {
      this.userList = snapshot.docs.map((e: any) => {
        const data = e.data();
        return data;
      })
    })

    this.listLoaded = true;
  }
}
