import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Course} from '../api-services.service'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
  }
  public sendEmail(studentID:number){
    this.apiService.resetPassword(studentID)
    .subscribe((res)=>{
      console.log(res);
    })
  }
}
