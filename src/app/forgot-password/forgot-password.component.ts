import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Course} from '../api-services.service'
import {  Router } from '@angular/router';
import {CommonfunctionsService} from '../commonfunctions.service'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  closeModal: string;
  constructor(private apiService: ApiServicesService,
    private router: Router,
    private commonfunction:CommonfunctionsService,) { }

  ngOnInit(): void {
  
  }



  public sendEmail(studentID:number){
    this.apiService.resetPassword(studentID)
    .subscribe((res)=>{
      console.log(res);
      if("message"  in res){
        this.commonfunction.openSnackBar("Check your email for new Password");
        this.router.navigateByUrl("/signIn");
      }
     
    },
    (error)=>{
        this.commonfunction.openSnackBar("Invalid ID, Please Enter a valid Student ID");
    })
  }
}
