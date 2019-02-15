import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  employees = [
    { id: 1, name: 'david', entry: Date.now() },
    { id: 2, name: 'eva', entry: Date.now() },
    { id: 3, name: 'oreo', entry: Date.now() }
  ];
  constructor() { }

  getEmployees() {

    return this.employees;
  }
}
