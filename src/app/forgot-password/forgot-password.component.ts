import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Course} from '../api-services.service'
import {  Router } from '@angular/router';
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  closeModal: string;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private apiService: ApiServicesService,
    private router: Router,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  
  }

  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }

  public sendEmail(studentID:number){
    this.apiService.resetPassword(studentID)
    .subscribe((res)=>{
      console.log(res);
      if("message"  in res){
        this.openSnackBar("Check your email for new Password");
        this.router.navigateByUrl("/signIn");
      }
     
    },
    (error)=>{
        this.openSnackBar("Invalid ID, Please Enter a valid Student ID");
    })
  }
}
