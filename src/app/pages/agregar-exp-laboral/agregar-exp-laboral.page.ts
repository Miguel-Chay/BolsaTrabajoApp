import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-exp-laboral',
  templateUrl: './agregar-exp-laboral.page.html',
  styleUrls: ['./agregar-exp-laboral.page.scss'],
})
export class AgregarExpLaboralPage implements OnInit {

  public checked : boolean = false;//variable para saber si el checkbox esta marcado

  constructor() { }

  
  ngOnInit() {
  }
 
clickbox(): void {
  	this.checked = !this.checked;
  	console.log("checked: " + this.checked);//it is working !!!
	}

 


}