import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';

import { CourseService } from '../../services/course.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Course } from '../../interfaces/interfaces';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.page.html',
  styleUrls: ['./editar-curso.page.scss'],
})
export class EditarCursoPage implements OnInit {
	id : string;
	course : Course;


  constructor(private route: ActivatedRoute, private storage: Storage,  private uiService: UiServiceService,
  	private courseService : CourseService) { 
  	this.initForm()
  	}


  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get('id');
  	console.log(this.id)
  	this.maxDate1  = this.maxDate2 = this.getNowDate()
  	this.minDate2=("1970")

  	this.courseService.getCourse(this.id).subscribe( course=>{this.course=course
  		console.log(course)

  		this.addData = new FormGroup({
    	id : new FormControl(this.course.id),
  		cv_id: new FormControl(this.course.cv_id),
  		name: new FormControl(this.course.name,[ Validators.required, Validators.maxLength(175)]),
  		hours: new FormControl(this.course.hours,[ Validators.pattern("^[0-9]*$"),Validators.maxLength(3)]),
  		institution: new FormControl(this.course.institution),
		mode: new FormControl(this.course.mode),
  		start: new FormControl(this.course.start),
  		end: new FormControl(this.course.end),
    	});
  	});

  }


	maxDate1 :string;
	minDate2 :string;
	maxDate2 :string;
	// ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------



  imprimir(){
  	console.log(this.addData.value)
  	console.log(this.minDate2, this.maxDate1, this.maxDate2)
  	
  }

  initForm() {
  	// this.storage.get('id').then((val) => {this.addData.get('cv_id').setValue(val);})
  	
  	this.addData = new FormGroup({
    	id : new FormControl(''),
  		cv_id: new FormControl(''),
  		name: new FormControl(''),
  		hours: new FormControl(''),
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
      const confirm = await this.uiService.AlertLeaveOKCANCEL('¿Desea guardar los cambios de este curso?',"info",'/mi-perfil/mp-cursos')
      if(confirm){
        this.courseService.updateCourse(
            this.addData.get('id').value,
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
