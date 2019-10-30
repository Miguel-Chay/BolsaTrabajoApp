import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-form-academica',
  templateUrl: './agregar-form-academica.page.html',
  styleUrls: ['./agregar-form-academica.page.scss'],
})
export class AgregarFormAcademicaPage implements OnInit {
  public checked : boolean = false;//variable para saber si el checkbox esta marcado

  constructor() { }

  
  ngOnInit() {
  }
 
clickbox( x:number): void {
	if(x == 1)
	{
		this.checked=true;
	}
	else
	{
		this.checked=false;
	}
	console.log(x);
  	console.log("checked: " + this.checked);//it is working !!!
	}

 


}
