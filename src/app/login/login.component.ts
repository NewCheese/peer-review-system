import { Component, OnInit } from '@angular/core';
import {ApiServicesService, User} from '../api-services.service'
import {Router} from "@angular/router"
import {AuthenticationService} from "../authentication.service"
import {CommonfunctionsService} from '../commonfunctions.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loading = false;
  submitted = false;
  constructor(private apiService: ApiServicesService,
    private router: Router,
    private authService : AuthenticationService,
    private commonfunction:CommonfunctionsService,) { }
  loggedIn:User;
  ngOnInit(): void {
  }
  public login(username,password){
    this.loading = true;
    this.authService.login(username,password).subscribe((res)=>{
      console.log(res);
      if("message" in res){
        this.commonfunction.openSnackBar(res["message"]);
        localStorage.setItem('isUserLoggedIn', "false");
        this.loading = false;
        return;
      }
      this.loggedIn = res;
      localStorage.setItem("userType",this.loggedIn.UserType)
      localStorage.setItem("EmailAddress",this.loggedIn.EmailAddress)
      localStorage.setItem('isUserLoggedIn', "true"); 
      localStorage.setItem("token", "my-super-secret-token-from-server");
      localStorage.setItem("ID",this.loggedIn.ID.toString());
      this.authService.sendMessage(this.loggedIn.UserType);
      if(this.loggedIn.UserType == "Teacher"){
        this.router.navigate(['/course']);
        return;
      }
      this.router.navigate(['student/courses']);
      return;
    });
  }
  public handlePasswordForgot(){
    this.router.navigate(['forgotPassword']);
  }

 
}
