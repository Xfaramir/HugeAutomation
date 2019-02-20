import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  employees = [
    { id: 1, name: 'david', entry: Date.now() },
    { id: 2, name: 'eva', entry: Date.now() },
    { id: 3, name: 'oreo', entry: Date.now() }
  ];
  constructor(private http:HttpClient) { }

  getEmployees() {

   return this.http.get('https://jsonplaceholder.typicode.com/users');

  }
}
