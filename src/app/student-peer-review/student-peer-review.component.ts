import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Template} from '../api-services.service'
import { environment } from 'src/environments/environment';
import {CommonfunctionsService} from '../commonfunctions.service'
import {Router} from "@angular/router"
@Component({
  selector: 'app-student-peer-review',
  templateUrl: './student-peer-review.component.html',
  styleUrls: ['./student-peer-review.component.css']
})
export class StudentPeerReviewComponent implements OnInit {
  Questions ;
  state;
  template:Template;
  isText:Boolean;
  disableConidition = false;
  url = environment.apiUrl+"/download/"
  public newArray: any = [];
  constructor(private apiService: ApiServicesService,
    public commonfunction:CommonfunctionsService,
    private router: Router,) { }

  ngOnInit(): void {
    this.state = window.history["state"];
    console.log("This is state");
    console.log(this.state);
    this.getTemplate();
    this.viewResults();
    this.getSubmissions();
    this.getPreviousPeerReview();
  }
  peerReview ;
  allSubmissions;
  public getTemplate(){
    this.apiService.getTemplate(this.state["TemplateID"])
    .subscribe((res)=>{
      console.log(res);
      this.template = res;
      if(this.template.TemplateType=="0"){
        this.isText = false;
      }
      else {
        this.isText = true;
      }
    })
  }
  public  viewResults() : any{
    this.apiService.getQuestionare(this.state["ID"])
    .subscribe((res)=>{
      console.log(res);
      this.Questions = res;
    })
  
  }

  public peerReviewSubmission(){
    console.log(this.newArray);
    var c  = 1;
    console.log(this.allSubmissions[0].ID);
    for(var v in this.newArray){
      c += 1;
      this.apiService.postPeerReview(
      this.allSubmissions[0].ID,
       this.allSubmissions[0].GroupID,
        Number(localStorage.getItem("ID")),
        this.allSubmissions[0].StudentID,c,
        this.newArray[v],this.state.AssignmentID
      )
  .subscribe((res)=>{
   console.log(res);
   this.commonfunction.openSnackBar("Peer Review Submitted Successfully");
   this.router.navigateByUrl('student/courses');
  })
    }
  }
  public getSubmissions(){
    this.apiService.getSubmissions(this.state.AssignmentID,Number(localStorage.getItem("ID")))
    .subscribe((res)=>{
      this.allSubmissions = res;
      this.url += this.allSubmissions[0].FileName;
    })
  }
  previousSubmission;
  public getPreviousPeerReview(){
    console.log("Function");
    this.apiService.getPeerReviewSubmissions(this.state.AssignmentID,Number(localStorage.getItem("ID")))
    .subscribe((res)=>{
      console.log("Peer Reviewed");
      console.log(res);
     if(res["message"] == 1){
      this.disableConidition =  false;
     }
     else {
      this.disableConidition =  true;
      this.previousSubmission = res[0].SubmissionDate
     }
    })
  }
  public checkerPeer(){
   return false;
    var date1 = this.state.PeerReviewDate;
    let Date1 = new Date(date1);

    var date2 = this.state.PeerReviewEndDate;
    let Date2 = new Date(date2);

    var date3 = new Date();
    if(date3.getTime() >= Date1.getTime() && date3.getTime() <= Date2.getTime()){
      return false;
    }
    return true;
  }

}
