import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Assignment} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css']
})
export class StudentAssignmentComponent implements OnInit {


    state ;
    
  
    ngOnInit(): void {
      this.state = history.state;
      console.log("State");
      console.log( this.state);
      this.viewResults();
      
    }
    allAssignments:Assignment[] = [];
    constructor(private apiService: ApiServicesService,
        private commonfunction:CommonfunctionsService,
        private dialogRef : MatDialog) { 
          
    }
  
    public dataSource = new MatTableDataSource<Assignment>();
    closeModal: string;
   
  

  public  viewResults() : any{
    this.apiService.viewGroupAssignments(this.state.CourseID,Number(localStorage.getItem("ID")))
    .subscribe((res)=>{
      this.allAssignments = res;
      console.log(res);
    })
  
  }
  public deleteAssignment(element:Assignment){
    let ans  = confirm("Are you sure you want to delete "+element.TaskName);
    if(ans){
      this.apiService.deleteAssignment(element.ID).subscribe((res)=>{
        this.commonfunction.openSnackBar("Record deleted successfully");
            this.ngOnInit();
  
      });
    }
  }
}

  
  