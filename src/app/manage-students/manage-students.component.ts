import { Component, OnInit } from '@angular/core';
import {ApiServicesService,studentCourses} from '../api-services.service'
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import {ManageStudentsPopUpComponent} from '../manage-students-pop-up/manage-students-pop-up.component';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {CommonfunctionsService} from '../commonfunctions.service'
import {saveAs} from "file-saver";

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['StudentID', 'StudentName','Status'];
  public dataSource = new MatTableDataSource<studentCourses>();
  closeModal: string;
  state ;
    constructor(private apiService: ApiServicesService,private dialogRef : MatDialog,
      @Inject(DOCUMENT) private domDocument: Document,
      private commonfunction:CommonfunctionsService ) { 
  
    }
    allStudents;
    ngOnInit(): void {
     this.state = history.state;
     console.log("State");
     console.log(history.state);
     this.getStudentDetails();
     this.viewResults();
    }
    public getStudentDetails(){
      this.apiService.getStudents()
    .subscribe((res)=>{
      console.log(res);
      this.allStudents = res;
    })
    }

  public  viewResults() : any{
    this.apiService.enrolledStudents(this.state.ID)
    .subscribe((res)=>{
      this.dataSource.data = res;
      console.log("Data got");
      console.log(res);
    })
  
  }

  public downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
  
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "Template"+".csv");
  }

  public openPopUp(){
    this.dialogRef.open(ManageStudentsPopUpComponent,{
      data : {
      "CourseName":this.state.CourseName
      }
    }).afterClosed()
    .subscribe(response => {
      let StudentID = response["StudentID"];
        this.apiService.manageStudents(StudentID,this.state.ID).subscribe((res)=>{
          if("message" in res){
            this.commonfunction.openSnackBar(res["message"]);
            return;
          }
          console.log("res");
          console.log(res);
          this.commonfunction.openSnackBar("Record added successfully");
           this.ngOnInit(); 
        });

    });;
    
  }
  public downloadTemplate(){
    var answer = {};
    answer["StudentID"] = null;
    var temp = [];
    temp.push(answer);
    this.downloadFile(temp)
    
  }
  public setStudentName(ID:number){
    console.log(ID);
    for (var val of this.allStudents) {
      
      if(val["ID"] == ID){
        if(!val["FirstName"] || !val["LastName"]){
            return "Yet to set"
        }
        return val["FirstName"]+ " "+val["LastName"];
      }
    }
      return "N/A";
  }
  public stripEmailAddress(Email:string){
    let all = Email.split("@");
    return all[0];
  }
  public setStudentID(ID:number){
   
    for (var val of this.allStudents) {
      
      if(val["ID"] == ID){
        let studentID = this.stripEmailAddress(val["EmailAddress"])
        return studentID;
      }
    }
      return null;
  }
  public setStatus(status){
    if(status){
      return("Added");
    }
return("Pending");
  }
  public addStudents(){

  }

  public changeListener(files: FileList){
    console.log(files);
    var i = 0;
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            
            let csvRecordsArray = (<string>csv).split(/\r\n|\n/);
            console.log(csvRecordsArray);
           for(var row in csvRecordsArray){
             
            if(i==0){
              let ans =  csvRecordsArray[row].split(",");
              console.log(ans);
              if(ans.length >1){
                this.commonfunction.openSnackBar("Invalid CSV Format");
              }
              i = 1;
              continue;
            }
            var result = csvRecordsArray[row]
            if(result.length != 8 ){
              continue;
            }
            this.apiService.manageStudents(result,this.state.ID).subscribe((res)=>{
              if("message" in res){
                this.commonfunction.openSnackBar(res["message"]);
                return;
              }
              this.commonfunction.openSnackBar("Record added successfully");
               this.ngOnInit(); 
            });
    
           }
         }
      }
  }
}

