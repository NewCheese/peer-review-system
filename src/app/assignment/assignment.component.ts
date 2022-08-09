import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Assignment} from '../api-services.service'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from "@angular/material/table";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import {PopUpCourseComponent} from '../pop-up-course/pop-up-course.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {EditCoursePopUpComponent} from '../edit-course-pop-up/edit-course-pop-up.component'
import {NewTemplatePopUpComponent} from '../new-template-pop-up/new-template-pop-up.component'


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  state ;
  

  ngOnInit(): void {
    console.log("State is good");
    this.state = history.state;
    console.log("This is state");
    console.log( this.state);
    this.viewResults();
    
  }
  allAssignments:Assignment[] = [];
  constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,
      private _snackBar: MatSnackBar) { 
        
  }

  public dataSource = new MatTableDataSource<Assignment>();
  closeModal: string;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
public  viewResults() : any{
  this.apiService.viewAssignments(this.state.ID)
  .subscribe((res)=>{
    this.allAssignments = res;
    console.log(res);
  })

}
public deleteAssignment(element:Assignment){
  let ans  = confirm("Are you sure you want to delete "+element.TaskName);
  if(ans){
    this.apiService.deleteAssignment(element.ID).subscribe((res)=>{
      this.openSnackBar("Record deleted successfully");
          this.ngOnInit();

    });
  }
}


public openPopUp(){
  this.dialogRef.open(NewTemplatePopUpComponent,{
    data : {
      
    }
  }).afterClosed()
  .subscribe(response => {
    let name = response["Name"];
      let description = response["Description"];
      this.apiService.postTemplate(name,description).subscribe((res)=>{
        if("message" in res){
          this.openSnackBar(res["message"]);
          return;
        }
        this.openSnackBar("Record added successfully");
         this.ngOnInit(); 
      });

  });;

}
public downloadResults(ass){
console.log("Download Results");
}
}

