import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  messages: any;
  public userType:string="";
  constructor(  private authService: AuthenticationService,
    private router: Router) { 
      this.setHeaders();
    }

  ngOnInit(): void {
    this.setHeaders();
    this.userType = localStorage.getItem("userType");
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
  

}
