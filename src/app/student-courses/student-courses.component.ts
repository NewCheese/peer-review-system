import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from "@angular/material/table";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  enrolledCourses:studentCourses[] = [];
  constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,) { 

  }

  public dataSource = new MatTableDataSource<studentCourses>();
  Courses ;
  closeModal: string;
  ngOnInit(): void {
   this.viewResults();
   this.getCourses();
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
