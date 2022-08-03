import { Component, OnInit } from '@angular/core';
import {ApiServicesService,Template} from '../api-services.service'
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import {NewTemplatePopUpComponent} from '../new-template-pop-up/new-template-pop-up.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {CommonfunctionsService} from '../commonfunctions.service'
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Name','Description','CreationDate','edit','del'];
  public dataSource = new MatTableDataSource<Template>();
  closeModal: string;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private apiService: ApiServicesService,private dialogRef : MatDialog,
      private _snackBar: MatSnackBar,
      @Inject(DOCUMENT) private domDocument: Document,
      private commonfunctions:CommonfunctionsService ) { 
  
    }
    ngOnInit(): void {
     this.viewResults();
    }
    public openSnackBar(message:string) {
      this._snackBar.open(message, "Dismiss",{
        duration: this.durationInSeconds * 1000 ,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,

      });
    }
  public  viewResults() : any{
    this.apiService.viewTemplates()
    .subscribe((res)=>{
      this.dataSource.data = res;
    })
  
  }
   public editTemplate(element:Template){
  
    this.dialogRef.open(PopUpComponent,{
      data : {
        element
      }
    }).afterClosed()
    .subscribe(response => {
       
        let name = response["Name"];
        let description = response["Description"];
        this.apiService.putTemplate(name,description,element.ID).subscribe((res)=>{
  
          if("message" in res){
            this.openSnackBar(res["message"]);
            return;
          }
          
        this.openSnackBar("Record updated successfully");
            this.ngOnInit();
      
        });
      
    });;


  }

  public deleteTemplate(element:Template){
    let ans  = confirm("Are you sure you want to delete "+element.Name);
    if(ans){
      this.apiService.deleteTemplate(element.ID).subscribe((res)=>{
        this.openSnackBar("Record deleted successfully");
            this.ngOnInit();

      });
    }
  }


  public openPopUp(){
    this.dialogRef.open(NewTemplatePopUpComponent,{
      data : {
        
      }
    }).afterClosed()
    .subscribe(response => {
      let name = response["Name"];
        let description = response["Description"];
        this.apiService.postTemplate(name,description).subscribe((res)=>{
          if("message" in res){
            this.openSnackBar(res["message"]);
            return;
          }
          this.openSnackBar("Record added successfully");
           this.ngOnInit(); 
        });

    });;

  }
}

