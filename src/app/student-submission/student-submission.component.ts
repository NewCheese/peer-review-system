import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
import {CommonfunctionsService} from '../commonfunctions.service'
@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css']
})
export class StudentSubmissionComponent implements OnInit {
  fileToUpload: File | null = null;
  constructor(private apiService: ApiServicesService,
    public commonfunction:CommonfunctionsService,) { }
  state ;
  Sub= [];
  ngOnInit(): void {
    this.state = history.state;
    console.log(this.state);
    this.getSubmissions();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
uploadFileToActivity() {
  // this.apiService.postFile(this.fileToUpload).subscribe(data => {
    
  // }
  this.apiService.postFile(this.fileToUpload,this.state.ID,2)
  .subscribe((res)=>{
   console.log(res);
  })
}
public getSubmissions(){
  this.apiService.getSubmission(43,Number(localStorage.getItem("ID")))
  .subscribe((res)=>{
    this.Sub = res;
    console.log(this.Sub.length);
  })
}
}
