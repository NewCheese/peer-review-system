import { Injectable } from '@angular/core';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
export interface User{
  EmailAddress: string;
  FirstName: string;
  ID: number;
  Password: string;
  UserType: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private subject = new BehaviorSubject<any>("");
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>( environment.apiUrl+ 'login', {
      username,
      password
    });
  }
  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
  sendMessage(message: string) {
    this.subject.next({ userType: message });
  }

dynamicData(): Observable<any> {
    return this.subject.asObservable();
}
}
