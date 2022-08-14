import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Assignment} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import {saveAs} from "file-saver";
import {Router} from "@angular/router"

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  state ;
  

  ngOnInit(): void {
    this.state = history.state;
    this.viewResults();    
  }
  allAssignments:Assignment[] = [];
  constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,
      private router: Router) { 
        
  }

  public dataSource = new MatTableDataSource<Assignment>();
  closeModal: string;

public  viewResults() : any{
  this.apiService.viewAssignments(this.state.ID)
  .subscribe((res)=>{
    this.allAssignments = res;
  })

}
public deleteAssignment(element:Assignment){
  let ans  = confirm("Are you sure you want to delete "+element.TaskName);
  if(ans){
    this.apiService.deleteAssignment(element.AssignmentID).subscribe((res)=>{
      this.commonfunction.openSnackBar("Record deleted successfully");
          this.ngOnInit();

    });
  }
}
public downloadFile(data: any,ASSIGNMENT_ID) {
  const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
  const header = Object.keys(data[0]);
  let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var blob = new Blob([csvArray], {type: 'text/csv' })
  saveAs(blob, "ASSIGNMENT_"+ASSIGNMENT_ID+".csv");
}

  public downloadResults(ass){
    
    this.apiService.getResults(ass["AssignmentID"])
    .subscribe((res1)=>{ 
      if(res1.length==0){
        this.commonfunction.openSnackBar("No Submissions yet");
      }
       this.downloadFile(res1,ass.AssignmentID);
       this.commonfunction.openSnackBar("Results Downloaded");
    })
  
  }
}

