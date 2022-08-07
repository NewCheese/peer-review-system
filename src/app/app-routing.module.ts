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
import { AuthenticationGuardGuard } from './authentication-guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
const routes: Routes = [
{ path: "course", component: CoursesComponent , canActivate: [AuthenticationGuardGuard]},
{ path: "template", component: TemplateComponent , canActivate: [AuthenticationGuardGuard]},
{path:"questionare",component:QuestionareComponent, canActivate: [AuthenticationGuardGuard]},
{path:"assignment",component:AssignmentComponent, canActivate: [AuthenticationGuardGuard]},
{path:"create/assignment",component:AssignmentHandlerComponent, canActivate: [AuthenticationGuardGuard]},
{path:"update/assignment",component:AssignmentHandlerComponent, canActivate: [AuthenticationGuardGuard]},
{path:"student/courses",component:StudentCoursesComponent, canActivate: [AuthenticationGuardGuard]},
{path:"student/assignment",component:StudentAssignmentComponent, canActivate: [AuthenticationGuardGuard]},
{path:"student/submission",component:StudentSubmissionComponent, canActivate: [AuthenticationGuardGuard]},
{path:"student/peer/review",component:StudentPeerReviewComponent, canActivate: [AuthenticationGuardGuard]},
{path:"addStudents",component:ManageStudentsComponent, canActivate: [AuthenticationGuardGuard]},
{path:"signIn",component:LoginComponent},
{path:"forgotPassword",component:ForgotPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
