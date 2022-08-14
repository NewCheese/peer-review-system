import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Course} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import {PopUpCourseComponent} from '../pop-up-course/pop-up-course.component';
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
    ) { 

  }

  public dataSource = new MatTableDataSource<Course>();
  closeModal: string;
  ngOnInit(): void {
   this.viewResults();
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
          this.commonfunction.openSnackBar(res["message"]);
          return;
        }
        this.commonfunction.openSnackBar("Record added successfully");
         this.ngOnInit(); 
      });

  });;

}

public deleteCourse(element:Course){
  let ans  = confirm("Are you sure you want to delete "+element.CourseName);
  if(ans){
    this.apiService.deleteCourse(element.ID).subscribe((res)=>{
      this.commonfunction.openSnackBar("Record deleted successfully");
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
          this.commonfunction.openSnackBar(res["message"]);
          return;
        }
        
      this.commonfunction.openSnackBar("Record updated successfully");
          this.ngOnInit();
    
      });
    
  });;


}

}
