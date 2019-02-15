import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css']
})
export class BiographyComponent implements OnInit {
  isDisabled = true;

  successClass = 'text-danger';
  myid = 'testId';
  description = 'biography works!';
  hasError = false;
  isSpecial = true;
  messageClasses = {
    'text-success': !this.hasError,
    'text-danger': this.hasError,
    'text-special': this.isSpecial,
  };
  tytleStyles = {
    color: 'blue',
    fontStyle: 'italic'
  };
  highlighColor = 'blue';
  public greeting = 'aa';
  displayElement = false;

  color = 'red';

  items = ['balon', 'celular', 'avion'];

  fecha = new Date();

  persona = {
    name: 'oreo',
    lastname: 'hegyi'
  };
  numbero = 123.9191;
  Name = '';
  titulos = 'david Rulez';
  mensajes = 'Hola people como van?';
  @Input() parentData;
  @Input('parentData') titulo;


  employees = [];

  @Output() public childEvent = new EventEmitter();

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {

    this.employees = this._employeeService.getEmployees();

  }

  onClick(event) {

    this.greeting = 'Welcome Back';
    console.log(event);
    return console.log('It worked');
  }

  logMessage(value) {
    console.log(value);
  }

  fireChildEvent() {

    this.childEvent.emit("Hello People");
  }

}
