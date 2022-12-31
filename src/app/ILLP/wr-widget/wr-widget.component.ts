import { Component, OnInit, Input } from '@angular/core';
import { faSquareUpRight, faTrophy, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { UserData } from 'src/app/shared/user-data';
import { WrSubmission } from 'src/app/shared/wr-submission';

@Component({
  selector: 'app-wr-widget',
  templateUrl: './wr-widget.component.html',
  styleUrls: ['./wr-widget.component.css']
})
export class WrWidgetComponent implements OnInit {

  i_link = faUpRightFromSquare;
  i_cup = faTrophy;

  canShowWR:boolean = false;

  @Input('wr_best_run') wr_bestRun: WrSubmission | undefined
  @Input('wr_best_run_0') wr_bestRunFrom0: WrSubmission | undefined

  wr_bestRun_start:number = 0;
  wr_bestRun_end:number = 0;
  wr_bestRun_total:number = 0;

  wr_bestRun_player:UserData | undefined | null;
  wr_bestRunFrom0_player:UserData | undefined | null;

  wr_bestRunFrom0_end:number = 0;
  
  constructor(
    private authService: AuthService,
  ) { }

  async grabValues() {
    this.wr_bestRun_start = Number(this.wr_bestRun?.progress.replaceAll('%', '').replaceAll(' ', '').split('-')[0]);
    this.wr_bestRun_end = Number(this.wr_bestRun?.progress.replaceAll('%', '').replaceAll(' ', '').split('-')[1]);
    this.wr_bestRun_total = this.wr_bestRun_end - this.wr_bestRun_start;

    this.wr_bestRunFrom0_end = Number(this.wr_bestRunFrom0?.progress.replaceAll('%', '').replaceAll(' ', ''));

    if(this.wr_bestRun && this.wr_bestRunFrom0) {
      this.wr_bestRun_player = await this.authService.getDataFromUID(this.wr_bestRun?.submitted_by);
      this.wr_bestRunFrom0_player = await this.authService.getDataFromUID(this.wr_bestRunFrom0?.submitted_by);
    }
  }
  
  
  ngOnInit(): void {
    this.grabValues();
    
  }

}
