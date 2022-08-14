import { Injectable } from '@angular/core';
import {MatSnackBar,  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CommonfunctionsService {
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackBar: MatSnackBar) { }
  public calculateTimeDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    var diffMs =  dateSent.valueOf() -currentDate.valueOf() ;
    var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if(diffDays == 0){
      if(diffHrs==0){
        if(diffMins==0){
          return "Just now";
        }
        else {
          if(diffMins!=1){
            return diffMins +" minutes";
          }
          return diffMins +" minute";
        }
      }
      else {
        if(diffHrs!=1){
          return diffHrs +" hours";
        }
        return diffHrs +" hour";
      }
    }
    else {
      if(diffDays!=1){
        return diffDays +" days";
      }
      return diffDays +" day ";
    }
   }
  public calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    var diffMs =  currentDate.valueOf() - dateSent.valueOf();
    var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if(diffDays == 0){
      if(diffHrs==0){
        if(diffMins==0){
          return "Just now";
        }
        else {
          if(diffMins!=1){
            return "Updated "+diffMins +" minutes ago";
          }
          return "Updated "+diffMins +" minute ago";
        }
      }
      else {
        if(diffHrs!=1){
          return "Updated "+diffHrs +" hours ago";
        }
        return "Updated "+diffHrs +" hour ago";
      }
    }
    else {
      if(diffDays!=1){
        return "Updated "+diffDays +" days ago";
      }
      return "Updated "+diffDays +" day ago";
    }
   }
   public openSnackBar(message:string) {
    this._snackBar.open(message, "Dismiss",{
      duration: this.durationInSeconds * 1000 ,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
  
    });
  }
}


