import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
@Component({
  selector: 'app-student-peer-review',
  templateUrl: './student-peer-review.component.html',
  styleUrls: ['./student-peer-review.component.css']
})
export class StudentPeerReviewComponent implements OnInit {
  Questions ;
  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    this.viewResults();
  }
  peerReview ;
  public  viewResults() : any{
    this.apiService.getQuestionare(24)
    .subscribe((res)=>{
      console.log(res);
      this.Questions = res;
    })
  
  }
}
