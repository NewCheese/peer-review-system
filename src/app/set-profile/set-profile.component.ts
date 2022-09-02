import { Component, OnInit } from '@angular/core';
import {ApiServicesService} from '../api-services.service'
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
export const enum PasswordCheckStrength {
  Short,
  Common,
  Weak,
  Ok,
  Strong,
};
@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css']
})
   
export class SetProfileComponent implements OnInit {
  public id: string;
    closeModal: string;

    constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,
      private router: Router,
      private route: ActivatedRoute) { 
        
  }

    public static get MinimumLength(): number {
        return 5;
    }

    // Regex to check for a common password string - all based on 5+ length passwords
    private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

    public isPasswordCommon(password: string): boolean {
        return this.commonPasswordPatterns.test(password);
    }

  
    public checkPasswordStrength(password: string):PasswordCheckStrength {

  
        let numberOfElements = 0;
        numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
        numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
        numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
        numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

        // Assume we have a poor password already
        let currentPasswordStrength = PasswordCheckStrength.Short;

        // Check then strenth of this password using some simple rules
        if (password === null || password.length < SetProfileComponent.MinimumLength) {
            currentPasswordStrength = PasswordCheckStrength.Short;
        } else if (this.isPasswordCommon(password) === true) {
            currentPasswordStrength = PasswordCheckStrength.Common;
        } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
            currentPasswordStrength = PasswordCheckStrength.Weak;
        } else if (numberOfElements === 3) {
            currentPasswordStrength = PasswordCheckStrength.Ok;
        } else {
            currentPasswordStrength = PasswordCheckStrength.Strong;
        }

        // Return the strength of this password
        return currentPasswordStrength;
    }
  ngOnInit(): void {
    console.log("Landed");
    this.route.queryParams.subscribe(params => {
   this.id = params["ID"];
  });
  }


  public onClickSubmit(p,rp,f,l){
    console.log("called");
   var res = this.checkPasswordStrength(p);
   if(res == 0){
    this.commonfunction.openSnackBar("Password is Short");
    return;
   }
   else if(res == 1){
    this.commonfunction.openSnackBar("Password is Common");
    return;
   }
   else if(res == 2){
    this.commonfunction.openSnackBar("Password is Weak");
    return
  }
  if(p != rp){
    this.commonfunction.openSnackBar("Password does not match, try again");
    return
  }
  if(!f){
    this.commonfunction.openSnackBar("Enter First Name");
    return;
  }
  if(!l){
    this.commonfunction.openSnackBar("Enter Last Name");
    return;
  }
    this.apiService.putStudent(Number(this.id),p,f,l).subscribe((res)=>{
    this.commonfunction.openSnackBar("Record Added successfully");
    this.router.navigateByUrl("/signIn");
  });
   
  } 
}
