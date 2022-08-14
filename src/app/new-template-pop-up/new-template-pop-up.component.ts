import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-new-template-pop-up',
  templateUrl: './new-template-pop-up.component.html',
  styleUrls: ['./new-template-pop-up.component.css']
})
export class NewTemplatePopUpComponent implements OnInit {
  formData:Array<any>  = [];
  action:string;
  local_data:any;
  constructor(public dialogRef: MatDialogRef<NewTemplatePopUpComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   console.log(data);
  }

  ngOnInit(): void {
   
  }
  cancel() {
    this.dialogRef.close({
      "message":"Cancelled"
    })
  }

  confirm(name:string,description:string,format:string) {
    this.dialogRef.close({
      "Name" : name ,
      "Description" : description,
      "Format":format
    })
  }
}