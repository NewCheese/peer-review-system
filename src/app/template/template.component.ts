import { Component, OnInit } from '@angular/core';
import {ApiServicesService,Template} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import {NewTemplatePopUpComponent} from '../new-template-pop-up/new-template-pop-up.component';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {CommonfunctionsService} from '../commonfunctions.service'
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Name','Description','TemplateType','CreationDate','edit','del'];
  public dataSource = new MatTableDataSource<Template>();
  closeModal: string;


    constructor(private apiService: ApiServicesService,private dialogRef : MatDialog,
      @Inject(DOCUMENT) private domDocument: Document,
      private commonfunction:CommonfunctionsService ) { 
  
    }
    ngOnInit(): void {
     this.viewResults();
    }
  public  viewResults() : any{
    this.apiService.viewTemplates()
    .subscribe((res)=>{
      console.log(res);
      this.dataSource.data = res;
    })
  
  }
  public setTemplate(val){
    if(val=="0"){
      return "Formative";
    }
    return "Summative";
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
        let format = response["Format"];
        this.apiService.putTemplate(name,description,format,element.ID).subscribe((res)=>{
  
          if("message" in res){
            this.commonfunction.openSnackBar(res["message"]);
            return;
          }
          
        this.commonfunction.openSnackBar("Record updated successfully");
            this.ngOnInit();
      
        });
      
    });;


  }

  public deleteTemplate(element:Template){
    let ans  = confirm("Are you sure you want to delete "+element.Name);
    if(ans){
      this.apiService.deleteTemplate(element.ID).subscribe((res)=>{
        this.commonfunction.openSnackBar("Record deleted successfully");
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
        let format = response["Format"]
        this.apiService.postTemplate(name,description,format).subscribe((res)=>{
          if("message" in res){
            this.commonfunction.openSnackBar(res["message"]);
            return;
          }
          console.log(res);
          this.commonfunction.openSnackBar("Record added successfully");
           this.ngOnInit(); 
        });

    });;

  }
}

