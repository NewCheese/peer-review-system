import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

export interface updateTemplate {
  name: string;
  description: number;
}
@Component({
  selector: 'app-second-pop-up-questionare',
  templateUrl: './second-pop-up-questionare.component.html',
  styleUrls: ['./second-pop-up-questionare.component.css']
})
export class SecondPopUpQuestionareComponent implements OnInit {

  formData:Array<any>  = [];
  constructor(public dialogRef: MatDialogRef<SecondPopUpQuestionareComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   console.log(data);
  }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close({
      "message":"Cancelled"
    })
  }

  confirm(question:string) {
    this.dialogRef.close({
      "Question" : question 
    })
  }

}