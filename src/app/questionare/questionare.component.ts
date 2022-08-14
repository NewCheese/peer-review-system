import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {ApiServicesService,Question} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import {NewQuestionarePopUpComponent} from '../new-questionare-pop-up/new-questionare-pop-up.component';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {CommonfunctionsService} from '../commonfunctions.service'
import {SecondPopUpQuestionareComponent} from '../second-pop-up-questionare/second-pop-up-questionare.component'
@Component({
  selector: 'app-questionare',
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.css']
})
export class QuestionareComponent implements OnInit {
 
  displayedColumns: string[] = ['ID', 'Question','Sequence','CreationDate','edit','del'];
  public dataSource = new MatTableDataSource<Question>();
  closeModal: string;

    constructor(private apiService: ApiServicesService,private dialogRef : MatDialog,
      @Inject(DOCUMENT) private domDocument: Document,
      private commonfunction:CommonfunctionsService ,
      public router: Router, public route: ActivatedRoute) { 
  
    }

    state :any;
    
    ngOnInit(): void {
      this.state = history.state;
     this.viewResults(this.state.ID);

    }
  public  viewResults(Id) : any{
    this.apiService.viewQuestionare(Id)
    .subscribe((res)=>{
      this.dataSource.data = res;
    })
  
  }

  
   public editTemplate(element:Question){
  
    this.dialogRef.open(SecondPopUpQuestionareComponent,{
      data : {
        element
      }
    }).afterClosed()
    .subscribe(response => {
       
        let name = response["Question"];
        this.apiService.putQuestion(name,element.ID).subscribe((res)=>{
  
          if("message" in res){
            this.commonfunction.openSnackBar(res["message"]);
            return;
          }
          
        this.commonfunction.openSnackBar("Record updated successfully");
            this.ngOnInit();
      
        });
      
    });;


  }

  public deleteTemplate(element:Question){
    let ans  = confirm("Are you sure you want to delete "+element.Question);
    if(ans){
      this.apiService.deleteQuestion(element.ID, this.state.ID).subscribe((res)=>{
        this.commonfunction.openSnackBar("Record deleted successfully");
            this.ngOnInit();

      });
    }
  }


  public openPopUp(){
    this.dialogRef.open(NewQuestionarePopUpComponent,{
      data : {
        
      }
    }).afterClosed()
    .subscribe(response => {
      let name = response["Question"];
        this.apiService.postQuestion(this.state.ID,name,"2").subscribe((res)=>{
          if("message" in res){
            this.commonfunction.openSnackBar(res["message"]);
            return;
          }
          this.commonfunction.openSnackBar("Record added successfully");
           this.ngOnInit(); 
        });

    });;

  }
}

