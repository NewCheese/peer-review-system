import { Component, OnInit } from '@angular/core';
import {ApiServicesService, User} from '../api-services.service'
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiServicesService,
    private _snackBar: MatSnackBar,
    private router: Router) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
  loggedIn:User;
  ngOnInit(): void {
  }
  public login(username,password){
    this.apiService.login(username,password).subscribe((res)=>{
      console.log(res);
      if("message" in res){
        this.openSnackBar(res["message"]);
        localStorage.setItem('isUserLoggedIn', "false");
        return;
      }
      this.loggedIn = res;
      localStorage.setItem("userType",this.loggedIn.UserType)
      localStorage.setItem("EmailAddress",this.loggedIn.EmailAddress)
      localStorage.setItem('isUserLoggedIn', "true"); 
      if(this.loggedIn.UserType == "Teacher"){
        this.router.navigate(['/course']);
        return;
      }
      this.router.navigate(['student/courses']);
      return;
    });
  }
}
