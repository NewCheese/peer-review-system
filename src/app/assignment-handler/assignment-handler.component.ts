import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Course} from '../api-services.service'
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-assignment-handler',
  templateUrl: './assignment-handler.component.html',
  styleUrls: ['./assignment-handler.component.css']
})
export class AssignmentHandlerComponent implements OnInit {
  state ;
  Templates;
  formdata;
  AssessmentType : string = "Individual";
  indi:boolean = true;
  constructor(private apiService: ApiServicesService,
    private commonfunction:CommonfunctionsService,
    private dialogRef : MatDialog,
    private router: Router) { }
    defaultSelect ;
    isRouted:boolean= false;
    today = new Date();
    groupSize = 0;
  ngOnInit(): void {
    this.today = new Date();
    this.state = window.history.state;
    console.log("State")
   console.log(this.state)
   if(this.state.GroupSubmission > 0){
    this.AssessmentType = "Group"
   }
   this.getTemplates();
   this.formdata = new FormGroup({ 
    userName: new FormControl("Tutorialspoint")
 }); 
  if("TemplateID" in this.state){
  this.isRouted = true;
  }
  }
public getTemplates(){
  this.apiService.viewTemplates()
  .subscribe((res)=>{
    this.Templates = res;
    console.log(res);
  })
}
public getTemplateByID(template_id){
  
    for(var i of this.Templates ){
     
        if(i["ID"] == template_id){
          return i["Name"];
        }
    }
    
  return null;
}

public getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
public onClickSubmit(Assignment:string,Explaination:string,Weightage,submission:Date,Review:Date,temp:number,type,size,submissionEndDate:Date,PeerReviewEndDate:Date){
  if(this.groupSize <= 2 || this.groupSize > 10){
    this.commonfunction.openSnackBar("Enter a valid Group Size");
    return;
  }
  else if(Assignment.length == 0){
    this.commonfunction.openSnackBar("Enter a Unique Valid Assignment Name");
    return;
        }
       else if(Explaination.length == 0){
          this.commonfunction.openSnackBar("Enter a valid Explaination");
          return;
              }
              else if(Weightage==0){
                this.commonfunction.openSnackBar("Enter a valid Weightage for the assignment");
                return;
                    }
                    else if(Explaination.length == 0){
                      this.commonfunction.openSnackBar("Enter a valid Explaination");
                      return;
                          }
                          else if (!submission){
                            this.commonfunction.openSnackBar("Enter a valid Submission Date");
                            return;
                          }
                          else if (!Review){
                            this.commonfunction.openSnackBar("Enter a valid Review Date");
                            return;
                          }
                          else if(temp === undefined){
                           temp = this.state.TemplateID;
                          }
                          
                         if(this.isRouted){
                          console.log("Updated")
                          console.log(this.isRouted);
                          this.apiService.updateAssignment(
                            this.state.ID ,
                            this.state.CourseID,
                            temp,
                           Assignment,
                            Explaination ,
                            Weightage  ,
                            submission,
                             Review,
                             submissionEndDate,
                             PeerReviewEndDate

                          ).subscribe((res)=>{
                            console.log(res);
                            this.commonfunction.openSnackBar("Updated Successfully");
                            this.router.navigateByUrl('/assignment', { state: { ID:this.state.CourseID} });
                           })
                         }
                         else {
                          let id  ;
                          console.log("Creation")
                          console.log(this.isRouted);
                          console.log(this.state.CourseID);
                          if(this.state.CourseID == undefined){
                            id = this.state.ID ;
                          }
                          else {
                            id = this.state.CourseID ;
                          }
                         
                          this.apiService.postAssignment(
                            this.getRandomInt(100000000),
                            id,
                            temp,
                           Assignment,
                            Explaination ,
                            Weightage  ,
                            submission,
                             Review,
                             size,submissionEndDate,PeerReviewEndDate)
                          .subscribe((res)=>{
                           console.log(res);
                           this.commonfunction.openSnackBar("Record Added Successfully, it will reflect in some time");
                           this.router.navigateByUrl('/course', { state: { ID:this.state.ID} });
                          })
                        }

                       
                        

  }
  public onOptionsSelected(val){
    console.log(val);
    if(val==1){
      this.indi = false;
    }
    else {
      this.indi = true;
      this.groupSize = 0;
    }
  }

}
