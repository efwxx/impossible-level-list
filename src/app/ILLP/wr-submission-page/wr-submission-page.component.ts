import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { WrServiceService } from 'src/app/shared/wr-service.service';

@Component({
  selector: 'app-wr-submission-page',
  templateUrl: './wr-submission-page.component.html',
  styleUrls: ['./wr-submission-page.component.css']
})
export class WrSubmissionPageComponent implements OnInit {

  bil_levelName: string = '';
  bil_run: string = '';
  bil_run_start: number = 0;
  bil_run_end: number = 0;
  bil_run_total: number = 0;
  bil_isRunFrom0: boolean = false;

  bil_videoURL: string = '';
  bil_rawFootageURL: string = '';

  constructor(
    public authService: AuthService,
    private wrService: WrServiceService
  ) { }

  ngOnInit(): void {
  }

  remapProgress() {
    let arr = this.bil_run.replaceAll('%', '').replaceAll(' ', '').split('-');

    if (arr.length > 1) {
      this.bil_isRunFrom0 = false;
      this.bil_run_start = Number(arr[0]);
      this.bil_run_end = Number(arr[1]);
      this.bil_run_total = this.bil_run_end - this.bil_run_start;
    } else {
      this.bil_isRunFrom0 = true;
      this.bil_run_start = 0;
      this.bil_run_end = Number(arr[0]);
      this.bil_run_total = this.bil_run_end;
    }
  }

}
