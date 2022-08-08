import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
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
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  enrolledCourses:studentCourses[] = [];
  constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,
      private _snackBar: MatSnackBar) { 

  }

  public dataSource = new MatTableDataSource<studentCourses>();
  Courses ;
  closeModal: string;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ngOnInit(): void {
   this.viewResults();
   this.getCourses();
  }
  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
public  viewResults() : any{
  this.apiService.enrolledCourses(Number(localStorage.getItem("ID")))
  .subscribe((res)=>{
    console.log(res);
    this.enrolledCourses = res;
  })

}

public getCourses(){
  this.apiService.viewCourses()
  .subscribe((res)=>{
    this.Courses = res;
    console.log(this.Courses);
  })

}
public setCourseName(course_id){
  for (var val of this.Courses) {
    if(val["ID"] == course_id){
      return val["CourseName"];
    }
  }
   
}

public setCredits(course_id){
  for (var val of this.Courses) {
    if(val["ID"] == course_id){
      return val["Credits"];
    }
  }
   
}



}
