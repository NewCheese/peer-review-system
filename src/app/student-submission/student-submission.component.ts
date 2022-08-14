import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
import {CommonfunctionsService} from '../commonfunctions.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css']
})
export class StudentSubmissionComponent implements OnInit {
  fileToUpload: File | null = null;
  constructor(private apiService: ApiServicesService,
    public commonfunction:CommonfunctionsService,
    private router: Router) { }
  state ;
  disableConidition =  false;
  SubmissionError: Boolean = true;
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
  this.apiService.postFile(this.fileToUpload,this.state.AssignmentID,Number(localStorage.getItem("ID")),Number(this.state.GroupSubmission))
  .subscribe((res)=>{
   this.commonfunction.openSnackBar("File Submitted Succefully");
   this.router.navigateByUrl('student/courses');
  }),(error)=>{
    this.commonfunction.openSnackBar("Something went wrong,please make sure it is of the right format")
  }
}
public getSubmissions(){
  this.apiService.getSubmission(this.state["AssignmentID"],Number(localStorage.getItem("ID")))
  .subscribe((res)=>{
    this.Sub = res;
    console.log(res);
    console.log("FileName" in this.Sub);
   if("FileName" in this.Sub){
    this.disableConidition =  true;
   }
   else {
    this.disableConidition =  false;
   }
  })
}
public checkerSubmission(){

  var date1 = this.state.SubmissionDate;
  let Date1 = new Date(date1);

  var date2 = this.state.SubmissionEndDate;
  let Date2 = new Date(date2);

  var date3 = new Date();
  if(date3.getTime() >= Date1.getTime() && date3.getTime() <= Date2.getTime()){
    return false;
  }
  return true;
}
}
