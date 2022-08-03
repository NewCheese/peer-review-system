import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

export interface updateTemplate {
  name: string;
  description: number;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  formData:Array<any>  = [];
  constructor(public dialogRef: MatDialogRef<PopUpComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   console.log(data);
  }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close({
      "message":"Cancelled"
    })
  }

  confirm(name:string,description:string) {
    this.dialogRef.close({
      "Name" : name ,
      "Description" : description
    })
  }

}