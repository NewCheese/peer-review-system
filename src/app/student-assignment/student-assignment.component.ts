import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Assignment} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import {saveAs} from "file-saver";
import { RatePopupComponent } from '../rate-popup/rate-popup.component';
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
  public downloadFile(data: any,ASSIGNMENT_ID) {
    console.log(data);
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
   
    const header = Object.keys(data[0]);
    console.log(header);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
  
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "PeerReviewFeedback"+".txt");
  }
  public isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}
  public getPeerReviews(ass){
    this.apiService.getPeerReview(ass["AssignmentID"],localStorage.getItem("ID"))
    .subscribe((res)=>{ 
      if(res.length==0){
        this.commonfunction.openSnackBar("Peer review not found");
      }
      console.log(res);
      var answer  : any = {"Feedback" : null};
      var arr  = [];
    
      if(this.isNumber(res[0]["Answer"])){
        var marks = 0;
       
         for(var i of res){
          console.log(i);
          marks += Number(i["Answer"])
         }
         answer["Feedback"] = "You have been marked "+ (marks/res.length) +" out of 5";
      }
      else {
        var feeback = ""
        for(var i of res){
          feeback += i["Answer"] + " ,";
         }
         answer["Feedback"] = "Feedback is as follows "+ feeback ;
      }
      console.log(answer);
      arr.push(answer);
       this.downloadFile(arr,ass.AssignmentID);
       this.commonfunction.openSnackBar("Results Downloaded");
    })
  }
  public rating(ass){
  console.log(ass);
    this.dialogRef.open(RatePopupComponent,{

    }).afterClosed()
    .subscribe(response => {
        let stars = response["stars"];
        this.apiService.putStars(stars,ass["AssignmentID"],localStorage.getItem("ID")).subscribe((res)=>{
          if("message" in res){
            this.commonfunction.openSnackBar(res["message"]);
            return;
          }
          console.log("Result is")
          console.log(res);
        this.commonfunction.openSnackBar("Record updated successfully");
            this.ngOnInit();
        });
    });;


  }
}

