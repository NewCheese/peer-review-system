import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../environments/environment'
import { Router, NavigationStart } from '@angular/router';


export interface Course {
  CourseName: string;
  Credits: string;
  ID: number;
  CreationDate: Date;
  LecturerId: number;
} 

export interface User{
  EmailAddress: string;
  FirstName: string;
  ID: number;
  Password: string;
  UserType: string;
}

export interface Template {
  ID: number;
  Name: string;
  TemplateType:string
  Description: string;
  CreationDate: Date;
} 

export interface UpdateTemplate{
  Name: string;
  Description: string;
  TemplateType:string
}
export interface Question{
  ID : number ;
  TemplateID : number;
  Question: string;
  Sequence: string;
  CreationDate: Date;
}

export interface Assignment {
  ID: number;
  AssignmentID:number;
  CourseID: string;
  TemplateID: string;
  GroupSubmission:number
  Weightage : number
   TaskName : string;
   Explaination : string;
   SubmissionDate : Date;
   PeerReviewDate : Date;
   isSubmitted : Boolean;
   isPeerReviewed : Boolean;
   submissionEndDate:Date;
   PeerReviewEndDate :Date;
} 
export interface studentCourses{
  studentId :number ;
  courseId : number;
  status : boolean
}
export interface Submission{
  AssignmentID: number;
  FileName: string;
  FileSubmission: string;
  ID: number ;
  StudentID: number;
  SubmissionDate: string;
  isMarked: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient) { 

  }

  public resetPassword(StudentID:number): Observable<any> {
    
    return this.http.post<any>(environment.apiUrl+"reset/password/"+StudentID,null)
}

 public postFile(fileToUpload: File,AssignmentID:number,StudentID:number,GroupID :number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filename',fileToUpload.name);
    formData.append('file', fileToUpload);
    formData.append('AssignmentID',AssignmentID.toString());
    formData.append('StudentID',StudentID.toString());
    formData.append('GroupID',GroupID.toString());

    return this.http.post<any>(environment.apiUrl+"add/submission/", formData)
}
public getSubmission(assignmentId,student_id):Observable<Submission[]> {
  return this.http.get<Submission[]>(environment.apiUrl+'/get/submission/'+assignmentId+'/'+student_id)
}

public getSubmissions(assignmentId,student_id):Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'/get/submissions/'+assignmentId+'/'+student_id)
}
public getResults(assignmentId):Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'/get/results/'+assignmentId)
}
public getPeerReviewSubmissions(assignmentId,Student_id):Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'/get/results/'+assignmentId+'/'+Student_id)
}

public getPeerReviewDetails(assignmentId,Student_ID):Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'/get/peer/'+assignmentId+'/'+Student_ID)
}
public getQuestionare(assignmentId):Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'/get/questionare/'+assignmentId)
}
  public getStudents():Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'/get/all/students/')
  }
  public enrolledCourses(ID:number):Observable<studentCourses[]> {
    return this.http.get<studentCourses[]>(environment.apiUrl+'/get/enrolledCourses/'+ID)
  }
  public enrolledStudents(course_id:number):Observable<studentCourses[]> {
    return this.http.get<studentCourses[]>(environment.apiUrl+'/get/students/'+course_id)
  }
  public viewCourses():Observable<Course[]> {
    return this.http.get<Course[]>(environment.apiUrl+'/get/courses/')
  }
  public viewTemplates():Observable<Template[]> {
    return this.http.get<Template[]>(environment.apiUrl+'/get/templates/')
  }
  public getTemplate(template_id):Observable<Template> {
    return this.http.get<Template>(environment.apiUrl+'/get/template/'+template_id)
  }
  public viewAssignments(Id:number):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(environment.apiUrl+'/get/course/assignment/'+Id)
  }
  public viewGroupAssignments(Id:number,userID:number):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(environment.apiUrl+'/get/course/assignment/'+Id+'/'+userID)
  }
  public putTemplate(name:string,description:string,format:string,Id:number):Observable<UpdateTemplate>{
    return this.http.put<UpdateTemplate>(environment.apiUrl+'/put/template/'+Id,{
      "Name":name ,
      "Description":description,
      "Format":format
    })
  }
  public putCourse(CourseName:string,Credits:string,Id:number):Observable<UpdateTemplate>{
    return this.http.put<UpdateTemplate>(environment.apiUrl+'/put/course/'+Id,{
      "LecturerId" : 1,
      "ID":Id,
      "CourseName":CourseName ,
      "Credits":Credits
    })
  }
  public putQuestion(question:string,Id:number):Observable<Question>{
    return this.http.put<Question>(environment.apiUrl+'/put/question/'+Id,{
      "Question":question 
    })
  }
  public putStudent(user_id:number,password:string, firstName:string, Lastname:string):Observable<User>{
    return this.http.put<User>(environment.apiUrl+'/set/profile/'+user_id,{
      "Password":password,
      "FirstName":firstName,
      "LastName":Lastname
    })
  }

  public deleteTemplate(Id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/delete/template/'+Id);
  }
  public deleteAssignment(Id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/delete/assignment/'+Id);
  }

  public deleteCourse(Id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/delete/course/'+Id);
  }

  public postTemplate(name:string,description:string,format:string):Observable<UpdateTemplate>{
    return this.http.post<UpdateTemplate>(environment.apiUrl+'/add/template/',{
      "Name":name ,
      "Description":description,
      "Format":format
    })
  }
  public downloadFile(path:string):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/download/'+path)
  }
  public postPeerReview(
    SubmissionID : number,
    GroupID : number,
    reviewerStudentID : number ,
   submissionStudentID : number ,
   Sequence :  number ,
   Answer : String ,
   AssignmentID : number ):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'/post/peer/review',{
      "GroupID":GroupID,
      "reviewerStudentID":reviewerStudentID ,
      "submissionStudentID":submissionStudentID,
      "Sequence":Sequence ,
      "Answer":Answer,
      "AssignmentID":AssignmentID ,
      "SubmissionID":SubmissionID
    })
  }
  public manageStudents(studentID:string,CourseID:string):Observable<studentCourses>{
    return this.http.post<studentCourses>(environment.apiUrl+'add/student/'+CourseID,{
      "StudentID":studentID
    })
  }
  public viewQuestionare(Id:number):Observable<Question[]> {
    return this.http.get<Question[]>(environment.apiUrl+'/get/questions/'+Id)
  }
  public deleteQuestion(Id:number,TemplateId:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/delete/question/'+Id+"/"+TemplateId);
  }
  public postQuestion(TemplateID:number,name:string,description:string):Observable<UpdateTemplate>{
    console.log(TemplateID);
    console.log(name);
    console.log(description);
    return this.http.post<UpdateTemplate>(environment.apiUrl+'/add/question/',{
      "TemplateID":TemplateID,
      "Question":name ,
      "Sequence":description
    })
  }

  public postCourse(Coursename:string,credit:string):Observable<UpdateTemplate>{
    return this.http.post<UpdateTemplate>(environment.apiUrl+'/add/course/',{
      "LecturerId":1 ,
      "CourseName":Coursename ,
      "Credits":credit
    })
  }
  public postAssignment(
    AssignmentID:number,
    CourseID:number,
    TemplateID:number ,
    TaskName : string,
    Explaination : string,
    Weightage : number ,
    SubmissionDate : Date,
     PeerReviewDate : Date,
     size :number,
     submissionEndDate:Date,PeerReviewEndDate:Date):Observable<Assignment>{
      console.log(CourseID);
    return this.http.post<Assignment>(environment.apiUrl+'/add/assignment/',{
      "AssignmentID": AssignmentID,
      "CourseID":CourseID,
      "TemplateID":TemplateID ,
    "TaskName" : TaskName,
    "Explaination" : Explaination,
    "Weightage" : Weightage ,
    "SubmissionDate" : SubmissionDate,
     "PeerReviewDate" : PeerReviewDate,
     "GroupSize":size,
     "SubmissionEndDate":submissionEndDate,
     "PeerReviewEndDate":PeerReviewEndDate
    })
  }
  public updateAssignment(
    ID : number ,
    CourseID:number,
    TemplateID:number ,
    TaskName : string,
    Explaination : string,
    Weightage : number ,
    SubmissionDate : Date,
     PeerReviewDate : Date,
     SubmissionEndDate : Date,
     PeerReviewEndDate:Date
     ):Observable<Assignment>{
 
    return this.http.put<Assignment>(environment.apiUrl+'/put/assignment/'+ID,{
      "CourseID":CourseID,
      "TemplateID":TemplateID ,
    "TaskName" : TaskName,
    "Explaination" : Explaination,
    "Weightage" : Weightage ,
    "SubmissionDate" : SubmissionDate,
     "PeerReviewDate" : PeerReviewDate,
     "SubmissionEndDate" : SubmissionEndDate,
     "PeerReviewEndDate":PeerReviewEndDate
    })
  }


}
