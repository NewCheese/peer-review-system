import { Component, OnInit } from '@angular/core';
import {ApiServicesService, studentCourses} from '../api-services.service'
@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css']
})
export class StudentSubmissionComponent implements OnInit {
  fileToUpload: File | null = null;
  constructor(private apiService: ApiServicesService) { }
  state ;
  ngOnInit(): void {
    this.state = history.state;
    console.log(this.state);
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
}
