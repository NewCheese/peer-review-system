import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-student-peer-review',
  templateUrl: './student-peer-review.component.html',
  styleUrls: ['./student-peer-review.component.css']
})
export class StudentPeerReviewComponent implements OnInit {
  Questions ;
  state;
  public newArray: any = [];
  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    this.state = window.history["state"];
    console.log("This is state");
    console.log(this.state);
    this.viewResults();
    this.getSubmissions();
   
  }
  peerReview ;
  allSubmissions;
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
    for(var v in this.newArray){
      c += 1;
      this.apiService.postPeerReview(
        Number(localStorage.getItem("ID")),2,c,v,this.state.ID
      )
  .subscribe((res)=>{
   console.log(res);
  })
    }
  }


  public getSubmissions(){
    this.apiService.getSubmissions(43)
    .subscribe((res)=>{
      console.log("All Submissions");
      console.log(res);
      this.allSubmissions = res;
    })
  }
  public randomizer(){
    console.log("Randomizer");
    var t = this.allSubmissions[Math.floor(Math.random() * this.allSubmissions.length)];
    
    return t;
  }
  public downloadPeerAssignment(){
    var res = this.randomizer();
   

  }
}
