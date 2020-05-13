import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';

import { WorkExperienceService } from '../../services/work-experience.Service';
import { LineBusinessService } from '../../services/line-business.service';
import { UiServiceService } from '../../services/ui-service.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';


@Component({
  selector: 'app-editar-exp-laboral',
  templateUrl: './editar-exp-laboral.page.html',
  styleUrls: ['./editar-exp-laboral.page.scss'],
})
export class EditarExpLaboralPage implements OnInit {

  

   // Datos necesarios
   id :string; //id del workExperience a modificar
   now = new Date(); //calcula la fecha actual
   minDate: string; // pone los datos de las fechas en minimos
   maxDate: string;
   workExperience : WorkExperience;
   lineBusiness : LineBusiness;



   // ----- formato para almacenar la informacion a actualizar------
   updateData: FormGroup;
   
   // --------------------------------------------------------------



  constructor( private storage: Storage, private workExperienceService: WorkExperienceService,  
    private lineBusinessService: LineBusinessService ,private route: ActivatedRoute, 
    private uiService: UiServiceService ) { 

    this.initForm();
    
    if (this.now.getMonth()<10)
      this.minDate=this.maxDate= this.now.getFullYear()+"-0"+this.now.getMonth();  
    else
      this.minDate=this.maxDate= this.now.getFullYear()+"-"+this.now.getMonth();
  }

  
  ngOnInit() {
    // recupera la id enviada como parametro (app-routing) 
    this.id = this.route.snapshot.paramMap.get('id');

    this.workExperienceService.getWorkExperience(this.id).subscribe( workexperience=>{this.workExperience=workexperience

      //si el workexperience es su trabajo actual is is_current_job se pone en true y se le asigna una fecha maxDate por si 
      //decide cambiar la fecha de termino
      if (this.workExperience.end==null){
        this.workExperience.is_current_job=true; 
        this.workExperience.end=this.maxDate
        this.workExperience.month_end=this.maxDate.substr(5,2)
        this.workExperience.year_end= this.maxDate.substr(0,4)
      }
      else{
        this.workExperience.is_current_job=false;
      }

      console.log(workexperience)
        this.updateData = new FormGroup({
          wexperienceData: new FormGroup({
              id: new FormControl(this.workExperience.id, Validators.required),
              company: new FormControl(this.workExperience.company,[ Validators.required, Validators.maxLength(175)]),
              line_business_id:  new FormControl(this.workExperience.line_business_id, ),
              date_start: new FormControl(this.workExperience.start, Validators.required),
              date_end: new FormControl(this.workExperience.end, ),
              job_title: new FormControl(this.workExperience.job_title, [ Validators.required, Validators.maxLength(175)]),
              month_start : new FormControl(this.workExperience.month_start, Validators.required),
              year_start : new FormControl(this.workExperience.year_start, Validators.required),
              month_end :new FormControl(this.workExperience.month_end, Validators.required),
              year_end : new FormControl(this.workExperience.year_end, Validators.required),
              description: new FormControl(this.workExperience.description,),
              is_current_job : new FormControl(this.workExperience.is_current_job,),
          }),
           name: new FormControl('', ),
        })

    })

    this.lineBusinessService.getLineBusinesslist().subscribe(lineBusiness=>{
      this.lineBusiness=lineBusiness
    })

  }
 



 initForm() {
    this.updateData = new FormGroup(  {
      wexperienceData: new FormGroup({
        id: new FormControl( ),
        company : new FormControl( ), //empleador
        line_business_id : new FormControl( ),//id LineBusiness
        job_title : new FormControl( ), //puesto
        date_start: new FormControl( ), //auxiliar 1
        date_end: new FormControl( ),//auxiliar 2
        month_start : new FormControl( ),
        year_start : new FormControl( ),
        month_end :new FormControl( ),
        year_end : new FormControl( ),
        description : new FormControl( ),
        is_current_job  : new FormControl( ),
      }),
      name : new FormControl( ),
    });
  }


  imprimir(){
    console.log(this.updateData.value)
    // console.log("maxDate "+this.maxDate)
    // console.log("minDate "+this.minDate)
    // console.log(this.lineBusiness)
  // console.log (  "año: "+ this.updateData.get('wexperienceData').get('year_start').value.substr(5,2)); // Valor del campo en el formulario
  // console.log(   "2" + this.updateData.get('name').setValue("hola")); //Poner un nuevo valor al campo de nuestro formulario
  }





//si se desmarca el checkbox la fecha se pone como maxDate por si lo desmarca esa sera la fecha por defecto
  clickbox(): void {

    if (!this.updateData.get('wexperienceData').get('is_current_job').value) {
      this.updateData.get('wexperienceData').get('date_end').setValue(this.maxDate);
      this.updateData.get('wexperienceData').get('year_end').setValue(this.maxDate.substr(0,4));    
      this.updateData.get('wexperienceData').get('month_end').setValue(this.maxDate.substr(5,2));
    }
    
  }

//le asigna las fechas correspondientes a year_start y month_start
  onChangeStart($event) {
    this.minDate=this.updateData.get('wexperienceData').get('date_start').value;
    this.updateData.get('wexperienceData').get('year_start').setValue(this.updateData.get('wexperienceData').get('date_start').value.substr(0,4));  
    this.updateData.get('wexperienceData').get('month_start').setValue(this.updateData.get('wexperienceData').get('date_start').value.substr(5,2));  
  }
//le asigna las fechas correspondientes a year_end y month_end
  onChangeEnd($event) {
    this.updateData.get('wexperienceData').get('year_end').setValue(this.updateData.get('wexperienceData').get('date_end').value.substr(0,4));  
    this.updateData.get('wexperienceData').get('month_end').setValue(this.updateData.get('wexperienceData').get('date_end').value.substr(5,2));  
  }




  async updateWorkExperience(){
    
    const confirm = await this.uiService.alertaConfirmar('Desea guardar los cambios','/mi-perfil/mp-exp-laboral')
    if(confirm){
      this.workExperienceService.updateWorkExperience(
        this.id, 
        this.updateData.get('wexperienceData').get('company').value,
        this.updateData.get('wexperienceData').get('line_business_id').value , 
        this.updateData.get('wexperienceData').get('job_title').value ,
        this.updateData.get('wexperienceData').get('month_start').value ,
        this.updateData.get('wexperienceData').get('year_start').value ,
        this.updateData.get('wexperienceData').get('month_end').value ,
        this.updateData.get('wexperienceData').get('year_end').value , 
        this.updateData.get('wexperienceData').get('description').value,
        this.updateData.get('wexperienceData').get('is_current_job').value 
        ).subscribe( workExperience=>{});
    }
  }

}