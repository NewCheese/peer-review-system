import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userID ;
  messages: any;
  showFiller = false;
  public userType:string="";
  darkMode$ = this.darkModeService.darkMode$;
  constructor(  private authService: AuthenticationService,
    private router: Router,
    private darkModeService: DarkModeService) { 
      this.setHeaders();
    }

  ngOnInit(): void {
    this.setHeaders();
    this.userType = localStorage.getItem("userType");
    this.userID = localStorage.getItem("EmailAddress")
  }
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/signIn");
  }
  public setHeaders(){
    this.authService.dynamicData().subscribe(message => {
     this.userType = message["userType"];
     console.log("this is userType");
     console.log(this.userType);
  });
  }
  onToggle(): void {
    this.darkModeService.toggle();
  }
  sideNavBar(event){
    console.log(event);
  }
}
