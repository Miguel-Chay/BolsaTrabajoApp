import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { CourseService } from '../../services/course.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Course } from '../../interfaces/interfaces';


@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.page.html',
  styleUrls: ['./agregar-curso.page.scss'],
})
export class AgregarCursoPage implements OnInit {



	maxDate1 :string;
	minDate2 :string;
	maxDate2 :string;
	// ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------

  constructor(private storage: Storage,  private uiService: UiServiceService,private courseService : CourseService) {}

  ngOnInit() {
  	this.initForm()
  	this.maxDate1  = this.maxDate2 = this.getNowDate()
  	this.minDate2=("1970")
  }


  imprimir(){
  	console.log(this.addData.value)
  	
  }

  initForm() {
  	this.storage.get('id').then((val) => {this.addData.get('cv_id').setValue(val);})

    this.addData = new FormGroup({
    	//id : new FormControl(''),
  		cv_id: new FormControl(''),
  		name: new FormControl('',[ Validators.required, Validators.maxLength(175)]),
  		hours: new FormControl('',[ Validators.pattern("^[0-9]*$"),Validators.maxLength(3)]),
  		institution: new FormControl(''),
		  mode: new FormControl(''),
  		start: new FormControl(''),
  		end: new FormControl(''),
    });
  }

  getNowDate(){
  var date = new Date(); //Fecha actual
  var monthN = date.getMonth()+1; //obteniendo mes
  var dayN = date.getDate(); //obteniendo dia
  var year = date.getFullYear(); //obteniendo año
  var day
  var month
  if(dayN<10)
    day='0'+dayN; //agrega cero si el menor de 10
  else
  	day =dayN

  if(monthN<10)
    month='0'+monthN //agrega cero si el menor de 10
  else
  	month=monthN
  return year+"-"+month+"-"+day;
  }

  	//le asigna las fechas correspondientes a year_start y month_start
  	onChangeStart($event) {
    	this.minDate2=this.addData.get('start').value
      this.addData.get('start').setValue(this.addData.get('start').value.substr(0,10))
  	}
	//le asigna las fechas correspondientes a year_end y month_end
  	onChangeEnd($event) {
    	this.maxDate1=this.addData.get('end').value
      this.addData.get('end').setValue(this.addData.get('end').value.substr(0,10))
	}



	async addCourse(){

    if (this.addData.get('name').value.trim()=="") { 
       this.addData.get('name').setValue("")
       this.uiService.AlertaOK('el campo "Nombre del curso" no puede estar vacio',"war","")
    } else {
      const confirm = await this.uiService.AlertLeaveOKCANCEL('¿Desea agregrar el nuevo curso?',"info",'/mi-perfil/mp-cursos')
      if(confirm){
        this.courseService.addCourse(
            this.addData.get('cv_id').value,
            this.addData.get('name').value,
            this.addData.get('hours').value,
            this.addData.get('institution').value,
            this.addData.get('mode').value,
            this.addData.get('start').value,
            this.addData.get('end').value,
          ).subscribe( course=>{});
      }
    }
	}



}
