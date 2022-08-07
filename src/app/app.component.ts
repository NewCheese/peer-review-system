import { Component } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isShow=true;


  showHideNav(event){
    this.isShow= !((event instanceof LoginComponent) || (event instanceof ForgotPasswordComponent));                                                            
} 

}
