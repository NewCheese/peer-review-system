import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Course} from '../api-services.service'
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
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  allCourses:Course[] = [];
  constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,
      private _snackBar: MatSnackBar) { 

  }

  public dataSource = new MatTableDataSource<Course>();
  closeModal: string;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ngOnInit(): void {
   this.viewResults();
  }
  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
public  viewResults() : any{
  this.apiService.viewCourses()
  .subscribe((res)=>{
    this.allCourses = res;
  })

}

public openPopUp(){
  this.dialogRef.open(PopUpCourseComponent,{
    data : {
      
    }
  }).afterClosed()
  .subscribe(response => {
    let courseName = response["CourseName"];
      let Credit = response["Credit"];
      this.apiService.postCourse(courseName,Credit).subscribe((res)=>{
        if("message" in res){
          this.openSnackBar(res["message"]);
          return;
        }
        this.openSnackBar("Record added successfully");
         this.ngOnInit(); 
      });

  });;

}

public deleteCourse(element:Course){
  let ans  = confirm("Are you sure you want to delete "+element.CourseName);
  if(ans){
    this.apiService.deleteCourse(element.ID).subscribe((res)=>{
      this.openSnackBar("Record deleted successfully");
          this.ngOnInit();

    });
  }
}
public editCourse(element:Course){
  this.dialogRef.open(EditCoursePopUpComponent,{
    data : {
      element
    }
  }).afterClosed()
  .subscribe(response => {
     
      let name = response["CourseName"];
      let description = response["Credits"];
      this.apiService.putCourse(name,description,element.ID).subscribe((res)=>{

        if("message" in res){
          this.openSnackBar(res["message"]);
          return;
        }
        
      this.openSnackBar("Record updated successfully");
          this.ngOnInit();
    
      });
    
  });;


}

}
