import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-course',
  templateUrl: './pop-up-course.component.html',
  styleUrls: ['./pop-up-course.component.css']
})
export class PopUpCourseComponent implements OnInit {

  formData:Array<any>  = [];
  action:string;
  local_data:any;
  constructor(public dialogRef: MatDialogRef<PopUpCourseComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   console.log(data);
  }

  ngOnInit(): void {
   
  }
  cancel() {
    this.dialogRef.close({
      "message":"Cancelled"
    })
  }

  confirm(courseName:string,credit:string) {
    this.dialogRef.close({
      "CourseName" : courseName ,
      "Credit" : credit
    })
  }
}