import { Component, OnInit, Input } from '@angular/core';
import { faSquareUpRight, faTrophy, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { UserData } from 'src/app/shared/user-data';
import { WrServiceService } from 'src/app/shared/wr-service.service';
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

  @Input('wr_id_run') wr_ID_run: string = '';
  @Input('wr_id_run0') wr_ID_run0: string = '';
  wr_bestRun: WrSubmission | undefined
  wr_bestRunFrom0: WrSubmission | undefined

  wr_bestRun_start:number = 0;
  wr_bestRun_end:number = 0;
  wr_bestRun_total:number = 0;

  wr_bestRun_player:UserData | undefined | null;
  wr_bestRunFrom0_player:UserData | undefined | null;

  wr_bestRunFrom0_end:number = 0;
  
  constructor(
    private authService: AuthService,
    private wr_servive: WrServiceService,
  ) { }

  async grabValues() {
    let _wrData = await this.wr_servive.getWRFromID(this.wr_ID_run);
    let _wrData0 = await this.wr_servive.getWRFromID(this.wr_ID_run0);

    if(_wrData) {
      this.wr_bestRun = _wrData;
      this.wr_bestRun_start = Number(this.wr_bestRun?.progress.replaceAll('%', '').replaceAll(' ', '').split('-')[0]);
      this.wr_bestRun_end = Number(this.wr_bestRun?.progress.replaceAll('%', '').replaceAll(' ', '').split('-')[1]);
      this.wr_bestRun_total = this.wr_bestRun_end - this.wr_bestRun_start;
      this.wr_bestRun_player = await this.authService.getDataFromUID(this.wr_bestRun?.submitted_by);
    }

    if(_wrData0) {
      this.wr_bestRunFrom0 = _wrData0;
      this.wr_bestRunFrom0_end = Number(this.wr_bestRunFrom0?.progress.replaceAll('%', '').replaceAll(' ', ''));
      this.wr_bestRunFrom0_player = await this.authService.getDataFromUID(this.wr_bestRunFrom0?.submitted_by);
    }
  }
  
  
  ngOnInit(): void {
    this.grabValues();
    
  }

}
