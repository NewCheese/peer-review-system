import { Component, OnInit } from '@angular/core';
import {ApiServicesService,studentCourses} from '../api-services.service'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import {ManageStudentsPopUpComponent} from '../manage-students-pop-up/manage-students-pop-up.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {CommonfunctionsService} from '../commonfunctions.service'

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['StudentID', 'StudentName','Status'];
  public dataSource = new MatTableDataSource<studentCourses>();
  closeModal: string;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  state ;
    constructor(private apiService: ApiServicesService,private dialogRef : MatDialog,
      private _snackBar: MatSnackBar,
      @Inject(DOCUMENT) private domDocument: Document,
      private commonfunctions:CommonfunctionsService ) { 
  
    }
    allStudents;
    ngOnInit(): void {
     this.state = history.state;
     console.log("State");
     console.log(history.state);
     this.getStudentDetails();
     this.viewResults();
    }
    public getStudentDetails(){
      this.apiService.getStudents()
    .subscribe((res)=>{
      console.log(res);
      this.allStudents = res;
    })
    }
    public openSnackBar(message:string) {
      this._snackBar.open(message, "Dismiss",{
        duration: this.durationInSeconds * 1000 ,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,

      });
    }
  public  viewResults() : any{
    this.apiService.enrolledStudents(this.state.ID)
    .subscribe((res)=>{
      this.dataSource.data = res;
    })
  
  }
   
  public openPopUp(){
    this.dialogRef.open(ManageStudentsPopUpComponent,{
      data : {
      "CourseName":this.state.CourseName
      }
    }).afterClosed()
    .subscribe(response => {
      let StudentID = response["StudentID"];
        this.apiService.manageStudents(StudentID,this.state.ID).subscribe((res)=>{
          if("message" in res){
            this.openSnackBar(res["message"]);
            return;
          }
          console.log("res");
          console.log(res);
          this.openSnackBar("Record added successfully");
           this.ngOnInit(); 
        });

    });;
    
  }
  public setStudentName(ID:number){
    console.log(ID);
    for (var val of this.allStudents) {
      console.log(val);
      if(val["ID"] == ID){
        return val["FirstName"]+ " "+val["LastName"];
      }
    }
      return null;
  }
  public stripEmailAddress(Email:string){
    let all = Email.split("@");
    return all[0];
  }
  public setStudentID(ID:number){
    console.log(ID);
    for (var val of this.allStudents) {
      console.log(val);
      if(val["ID"] == ID){
        let studentID = this.stripEmailAddress(val["EmailAddress"])
        return studentID;
      }
    }
      return null;
  }
  public setStatus(status){
    if(status){
      return("Added");
    }
return("Pending");
  }
}

