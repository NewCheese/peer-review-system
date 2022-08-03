import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ApiServicesService, Course} from '../api-services.service'
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
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router"
@Component({
  selector: 'app-assignment-handler',
  templateUrl: './assignment-handler.component.html',
  styleUrls: ['./assignment-handler.component.css']
})
export class AssignmentHandlerComponent implements OnInit {
  state ;
  Templates;
  formdata;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private apiService: ApiServicesService,
    private commonfunction:CommonfunctionsService,
    private dialogRef : MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }
    defaultSelect ;
    isRouted:boolean= false;
  ngOnInit(): void {
    this.state = window.history.state;
    console.log("State")
   console.log(this.state)
   this.getTemplates();
   this.formdata = new FormGroup({ 
    userName: new FormControl("Tutorialspoint")
 }); 
  if("TemplateID" in this.state){
  this.isRouted = true;
  }
  }
  public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
public getTemplates(){
  this.apiService.viewTemplates()
  .subscribe((res)=>{
    this.Templates = res;
    console.log(res);
  })
}
public getTemplateByID(template_id){
  
    for(var i of this.Templates ){
     
        if(i["ID"] == template_id){
          return i["Name"];
        }
    }
    
  return null;
}
public onClickSubmit(Assignment:string,Explaination:string,Weightage,submission:Date,Review:Date,temp:number){
  if(Assignment.length == 0){
    this.openSnackBar("Enter a Unique Valid Assignment Name");
    return;
        }
       else if(Explaination.length == 0){
          this.openSnackBar("Enter a valid Explaination");
          return;
              }
              else if(Weightage==0){
                this.openSnackBar("Enter a valid Weightage for the assignment");
                return;
                    }
                    else if(Explaination.length == 0){
                      this.openSnackBar("Enter a valid Explaination");
                      return;
                          }
                          else if (!submission){
                            this.openSnackBar("Enter a valid Submission Date");
                            return;
                          }
                          else if (!Review){
                            this.openSnackBar("Enter a valid Review Date");
                            return;
                          }
                          else if(temp === undefined){
                           temp = this.state.TemplateID;
                          }
                         if(this.isRouted){
                          this.apiService.updateAssignment(
                            this.state.ID ,
                            this.state.CourseID,
                            temp,
                           Assignment,
                            Explaination ,
                            Weightage  ,
                            submission,
                             Review
                          ).subscribe((res)=>{
                            console.log(res);
                            this.openSnackBar("Updated Successfully");
                            this.router.navigateByUrl('/assignment', { state: { ID:this.state.CourseID} });
                           })
                         }
                         else {
                          this.apiService.postAssignment(
                            this.state.CourseID,
                            temp,
                           Assignment,
                            Explaination ,
                            Weightage  ,
                            submission,
                             Review)
                          .subscribe((res)=>{
                           console.log(res);
                           this.openSnackBar("Record Added Successfully, it will reflect in some time");
                           this.router.navigateByUrl('/assignment', { state: { ID:this.state.CourseID} });
                          })
                        }

                       
                        

  }
  

}
