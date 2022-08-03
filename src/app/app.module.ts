import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule} from  '@angular/material/icon';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatButtonModule} from  '@angular/material/button';
import { MatListModule} from  '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { TemplateComponent } from './template/template.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { QuestionareComponent } from './questionare/questionare.component';
import { NewQuestionarePopUpComponent } from './new-questionare-pop-up/new-questionare-pop-up.component';
import { SecondPopUpQuestionareComponent } from './second-pop-up-questionare/second-pop-up-questionare.component';
import { PopUpCourseComponent } from './pop-up-course/pop-up-course.component';
import { EditCoursePopUpComponent } from './edit-course-pop-up/edit-course-pop-up.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentHandlerComponent } from './assignment-handler/assignment-handler.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentAssignmentComponent } from './student-assignment/student-assignment.component';
import { StudentSubmissionComponent } from './student-submission/student-submission.component';
import { StudentPeerReviewComponent } from './student-peer-review/student-peer-review.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { ManageStudentsPopUpComponent } from './manage-students-pop-up/manage-students-pop-up.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    TemplateComponent,
    PopUpComponent,
    QuestionareComponent,
    NewQuestionarePopUpComponent,
    SecondPopUpQuestionareComponent,
    PopUpCourseComponent,
    EditCoursePopUpComponent,
    AssignmentComponent,
    AssignmentHandlerComponent,
    StudentCoursesComponent,
    StudentAssignmentComponent,
    StudentSubmissionComponent,
    StudentPeerReviewComponent,
    ManageStudentsComponent,
    ManageStudentsPopUpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    NgbModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
