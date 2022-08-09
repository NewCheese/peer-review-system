import { Component, OnInit } from '@angular/core';
import {ApiServicesService, Assignment} from '../api-services.service'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from "@angular/material/table";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonfunctionsService} from '../commonfunctions.service'
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import {PopUpCourseComponent} from '../pop-up-course/pop-up-course.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {EditCoursePopUpComponent} from '../edit-course-pop-up/edit-course-pop-up.component'
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
    durationInSeconds = 5;
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private apiService: ApiServicesService,
      private commonfunction:CommonfunctionsService,
      private dialogRef : MatDialog,
      private _snackBar: MatSnackBar,
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
    this.route.queryParams.subscribe(params => {
   this.id = params["ID"];
  });
  }

  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
  public onClickSubmit(p,rp,f,l){
    console.log("called");
   var res = this.checkPasswordStrength(p);
   if(res == 0){
    this.openSnackBar("Password is Short");
    return;
   }
   else if(res == 1){
    this.openSnackBar("Password is Common");
    return;
   }
   else if(res == 2){
    this.openSnackBar("Password is Weak");
    return
  }
  if(p != rp){
    this.openSnackBar("Password does not match, try again");
    return
  }
  if(!f){
    this.openSnackBar("Enter First Name");
    return;
  }
  if(!l){
    this.openSnackBar("Enter Last Name");
    return;
  }
    this.apiService.putStudent(Number(this.id),p,f,l).subscribe((res)=>{
    this.openSnackBar("Record Added successfully");
    this.router.navigateByUrl("/signIn");
  });
   
  } 
}
