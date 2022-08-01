import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-data-editor',
  templateUrl: './admin-data-editor.component.html',
  styleUrls: ['./admin-data-editor.component.css']
})
export class AdminDataEditorComponent implements OnInit {

  form = new FormGroup({
    ILLA_Name: new FormControl(null),
    ILLA_ID: new FormControl(null),
    ILLA_FPS: new FormControl(null),
    ILLA_CreatorsShort: new FormControl(null),
    ILLA_Uploader: new FormControl(null),
    ILLA_Position: new FormControl(null),
    ILLA_YTID: new FormControl(null),
    ILLA_CreatorsFull: new FormControl(null),
    ILLA_Tags: new FormControl(null),
    ILLA_WR_Min: new FormControl(null),
    ILLA_WR: new FormControl(null),
    ILLA_WRYT: new FormControl(null),
    ILLA_Deletion: new FormControl(null),
    ILLA_Annotation: new FormControl(null),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
