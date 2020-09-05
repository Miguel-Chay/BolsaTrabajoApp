import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController} from '@ionic/angular'

import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';

import { WorkExperienceService } from '../../services/work-experience.service';
import { LineBusinessService } from '../../services/line-business.service';
import { UiServiceService } from '../../services/ui-service.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';


@Component({
  selector: 'app-agregar-exp-laboral',
  templateUrl: './agregar-exp-laboral.page.html',
  styleUrls: ['./agregar-exp-laboral.page.scss'],
})
export class AgregarExpLaboralPage implements OnInit {

  public checked : boolean = false;//variable para saber si el checkbox esta marcado

   // Datos necesarios

   now = new Date();
   minDate: string;
   maxDate: string;
   workExperience : WorkExperience;
   lineBusiness : LineBusiness;
   is_current_job='';
   // ----- formato para almacenar la informacion a agregar------
  updateData: FormGroup;
   // --------------------------------------------------------------

  constructor( private storage: Storage, private workExperienceService: WorkExperienceService,  
    private lineBusinessService: LineBusinessService, private uiService: UiServiceService,
    private navCtrl: NavController) { 
   
    this.initForm();
    


    if (this.now.getMonth()<10)
      this.minDate=this.maxDate= this.now.getFullYear()+"-0"+this.now.getMonth();  
    else
      this.minDate=this.maxDate= this.now.getFullYear()+"-"+this.now.getMonth();
  }
  
  ngOnInit() {


    this.lineBusinessService.getLineBusinesslist().subscribe(lineBusiness=>{
      this.lineBusiness=lineBusiness
    })
    this.storage.get('id').then((val) => {
      this.updateData.get('wexperienceData').get('cv_id').setValue(val);  
    })


    // this.updateData.get('wexperienceData').get('line_business_id').setValue("NULL"); 
    
    this.updateData = new FormGroup({
           wexperienceData: new FormGroup({
              cv_id: new FormControl('', Validators.required),
              company: new FormControl('',[ Validators.required, Validators.maxLength(175)]),
              line_business_id:  new FormControl('', ),
              date_start: new FormControl('', Validators.required),
              date_end: new FormControl('', ),
              job_title: new FormControl('', [ Validators.required, Validators.maxLength(175)]),
              month_start : new FormControl('', Validators.required),
              year_start : new FormControl('', Validators.required),
              month_end :new FormControl('', Validators.required),
              year_end : new FormControl('', Validators.required),
              description: new FormControl('',),
      }),
           name: new FormControl('', ),
    })





  }
 



 initForm() {
    this.updateData = new FormGroup(  {
      wexperienceData: new FormGroup({
        cv_id: new FormControl( ),
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





//si esta marcado pone month_endy year_end en null
  clickbox(): void {
    this.checked = !this.checked;

    if (this.checked) {
      this.is_current_job="1";
      this.updateData.get('wexperienceData').get('year_end').setValue("null");  
      this.updateData.get('wexperienceData').get('month_end').setValue("null");  
    }
    else{
      this.is_current_job="0"
      this.updateData.get('wexperienceData').get('date_end').setValue('');
      this.updateData.get('wexperienceData').get('year_end').setValue('');    
      this.updateData.get('wexperienceData').get('month_end').setValue('');
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


  async addWorkExperience(){
    if(this.updateData.get('wexperienceData').get('company').value.trim()=="" || this.updateData.get('wexperienceData').get('job_title').value.trim()==""){ 
      if (this.updateData.get('wexperienceData').get('company').value.trim()=="") { 
        this.updateData.get('wexperienceData').get('company').setValue("")
        this.uiService.AlertaOK("El campo Empleador no puede estar vacio","war","")
      } else {
        this.updateData.get('wexperienceData').get('job_title').setValue("")
        this.uiService.AlertaOK("El campo Puesto no puede estar vacio","war","")
      }

    } else {
      const confirm = await this.uiService.AlertLeaveOKCANCEL('¿Desea guardar la nueva experiencia de trabajo?',"info",'/mi-perfil/mp-exp-laboral')
      if(confirm){
        this.workExperienceService.addWorkExperience(this.updateData.get('wexperienceData').get('cv_id').value, 
          this.updateData.get('wexperienceData').get('company').value,
          this.updateData.get('wexperienceData').get('line_business_id').value , 
          this.updateData.get('wexperienceData').get('job_title').value ,
          this.updateData.get('wexperienceData').get('month_start').value ,
          this.updateData.get('wexperienceData').get('year_start').value ,
          this.updateData.get('wexperienceData').get('month_end').value ,
          this.updateData.get('wexperienceData').get('year_end').value , 
          this.updateData.get('wexperienceData').get('description').value,
          this.is_current_job ).subscribe( workExperience=>{
            // this.navCtrl.navigateForward("/mi-perfil/mp-exp-laboral");
          });
      } 
    }
  }




}