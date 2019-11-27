import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  url: string = "http://localhost:8080/api/auth";

  constructor(private _http: HttpClient) { }

  addEmployee(addEmployeeForm: any) {
    console.log(addEmployeeForm)
    return this._http.post<any>(`${this.url}/addEmployee`, addEmployeeForm).pipe(map(employee => {

      return employee;
    }))
  }
}
