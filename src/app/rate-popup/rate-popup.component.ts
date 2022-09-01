import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

export interface updateTemplate {
  name: string;
  description: number;
}

@Component({
  selector: 'app-rate-popup',
  templateUrl: './rate-popup.component.html',
  styleUrls: ['./rate-popup.component.css']
})
export class RatePopupComponent implements OnInit {
  formData:Array<any>  = [];
  element ;
  constructor(public dialogRef: MatDialogRef<RatePopupComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   this.element = data;
  }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close({
      "message":"Cancelled"
    })
  }
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  public countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
}
  confirm(stars) {
    this.dialogRef.close({
      "stars":stars
    })
  }

}