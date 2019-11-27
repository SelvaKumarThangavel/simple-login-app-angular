import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  url:string = "http://localhost:8080/api/auth";

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userData){
    //console.log(userData)
    return this._http.post<any>(`${this.url}/login`, userData).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));
  }

  getUserName(userData: any) {
    //console.log(userData)
    return this._http.post<any>(`${this.url}/userName`, userData).pipe(map(userName =>{
      //store username in localstorage
      localStorage.setItem('userName', userName);
      return userName
    }))
  }

  resetPassword(userData: any) {
    //console.log(userData)
    return this._http.post<any>(`${this.url}/resetPassword`, userData).pipe(map(user =>{
      return user
    }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  newUserRegister(userData: any) {
    console.log(userData)
    return this._http.post<any>(`${this.url}/newUser`, userData).pipe(map(user=>{
      return user
    }))
  }
}
