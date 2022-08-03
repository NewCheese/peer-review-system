import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { TemplateComponent } from './template/template.component';
import {QuestionareComponent} from '../app/questionare/questionare.component'
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentHandlerComponent } from './assignment-handler/assignment-handler.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentAssignmentComponent } from './student-assignment/student-assignment.component';
import { StudentSubmissionComponent } from './student-submission/student-submission.component';
import { StudentPeerReviewComponent } from './student-peer-review/student-peer-review.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
{ path: "course", component: CoursesComponent },
{ path: "template", component: TemplateComponent },
{path:"questionare",component:QuestionareComponent},
{path:"assignment",component:AssignmentComponent},
{path:"create/assignment",component:AssignmentHandlerComponent},
{path:"update/assignment",component:AssignmentHandlerComponent},
{path:"student/courses",component:StudentCoursesComponent},
{path:"student/assignment",component:StudentAssignmentComponent},
{path:"student/submission",component:StudentSubmissionComponent},
{path:"student/peer/review",component:StudentPeerReviewComponent},
{path:"addStudents",component:ManageStudentsComponent},
{path:"signIn",component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
