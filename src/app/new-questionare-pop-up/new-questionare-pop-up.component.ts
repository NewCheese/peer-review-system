import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-new-questionare-pop-up',
  templateUrl: './new-questionare-pop-up.component.html',
  styleUrls: ['./new-questionare-pop-up.component.css']
})
export class NewQuestionarePopUpComponent implements OnInit {
  formData:Array<any>  = [];
  constructor(public dialogRef: MatDialogRef<NewQuestionarePopUpComponent>,@Inject(MAT_DIALOG_DATA) public data) {
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