import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit-course-pop-up',
  templateUrl: './edit-course-pop-up.component.html',
  styleUrls: ['./edit-course-pop-up.component.css']
})
export class EditCoursePopUpComponent implements OnInit {

  formData:Array<any>  = [];
  constructor(public dialogRef: MatDialogRef<EditCoursePopUpComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   console.log(data);
  }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close({
      "message":"Cancelled"
    })
  }

  confirm(CourseName:string,Credits:string) {
    this.dialogRef.close({
      "CourseName" : CourseName ,
      "Credits" : Credits
    })
  }

}