import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-manage-students-pop-up',
  templateUrl: './manage-students-pop-up.component.html',
  styleUrls: ['./manage-students-pop-up.component.css']
})
export class ManageStudentsPopUpComponent implements OnInit {

    formData:Array<any>  = [];
    constructor(public dialogRef: MatDialogRef<ManageStudentsPopUpComponent>,@Inject(MAT_DIALOG_DATA) public data) {
    }
  
    ngOnInit(): void {
    }
    cancel() {
      this.dialogRef.close({
        "message":"Cancelled"
      })
    }
  
    confirm(StudentID:string) {
      this.dialogRef.close({
        "StudentID" : StudentID 
      })
    }
  
  }