import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController,NavController } from '@ionic/angular';
import { VacantesPage } from '../vacantes/vacantes.page'
//servicios
import { JobOpeningService } from '../../services/job-opening.service';
import { OrganizationService } from '../../services/organization.service';
import { JobTypeService } from '../../services/job-type.service';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { StateService } from '../../services/state.service';
import { SubjectAreaService } from '../../services/subject-area.service';
import { OpeningSkillService } from '../../services/opening-skill.service';
import { OpeningProgrammeService } from '../../services/opening-programme.service';
import { OpeningLanguageService } from '../../services/opening-language.service';
import { JobOpeningStatusService } from '../../services/job-opening-status.service';
import { JobApplicationStatusLogService } from '../../services/job-application-status-log.service';
import { MessageService } from '../../services/message.service';
import { UiServiceService } from '../../services/ui-service.service';
//interfaces
import { Message,JobApplicationStatusLogs,JobsOpening,Organization,Candidate,JobOpeningStatus,OpeningLanguage,JobType,City,State,Country,SubjectArea, OpeningSkill,OpeningProgramme } from '../../interfaces/interfaces';
//variables
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vacante',
  templateUrl: './vacante.page.html',
  styleUrls: ['./vacante.page.scss'],
})
export class VacantePage implements OnInit {

  	id :string; //id de la vacante a visualizar
  	job_opening: JobsOpening;
  	organization:Organization;
  	job_type:JobType;
  	city:City;
  	state:State;
  	country:Country;
  	message:Message;
  	candidate: Candidate;
  	subjectArea:SubjectArea;
  	openingSkill:OpeningSkill;
  	openingProgramme:OpeningProgramme;
  	openingLanguage:OpeningLanguage;
  	jobStatus : JobOpeningStatus;
  	chipStatus :JobApplicationStatusLogs;

  	show : boolean=false;
  	URLphotos = environment.urlPhotos;
  	URL = environment.url;
  	logo :string =null;
  	canApplication:boolean=true;
  	



	
	addMessage: FormGroup;


  	constructor(private storage: Storage,
  				private route: ActivatedRoute,
  				private navCtrl: NavController,
  				private cityService : CityService,
  				private stateService : StateService,
	  				// private vacantesPage : VacantesPage,
  				private countryService : CountryService,
  				private jobTypeService : JobTypeService,
  				private messageService : MessageService,
  				private	toastController: ToastController,
  				private uiServiceService : UiServiceService,
  				private jobOpeningService : JobOpeningService,
  				private subjectAreaService: SubjectAreaService,
  				private organizationService:OrganizationService,
  				private openingSkillService: OpeningSkillService,
  				private openingLanguageService : OpeningLanguageService,
  				private openingProgrammeService : OpeningProgrammeService,
  				private jobOpeningStatusService : JobOpeningStatusService,
  				private jobApplicationStatusLogService :JobApplicationStatusLogService) { }
  	ngOnInit(){}

  	ionViewWillEnter() {

  		this.id = this.route.snapshot.paramMap.get('id');

  		this.jobOpeningService.getJobOpening(this.id).subscribe (job=>{
  			this.job_opening=job;

  			this.initForm()
  			this.getData()
  		})
  	}


  	getData(){

  		//se hizo la funcion para obtener el logo debido a que en en la funcion que llama del php
  		// verifica si existe el archivo en la carpeta y en la base de datos al mismo tiempo
  		this.organizationService.getLogo(this.job_opening.contact_id).subscribe(logo=>{
  			if (logo !=null){
  				this.logo=this.URLphotos+"/btuady/public_html/"+logo
				// console.log(this.logo, "1")
  			}
  		})

  		
		


		if (this.job_opening.subject_area_id!=null)
		{  			
	  		this.subjectAreaService.getSubjectArea(this.job_opening.subject_area_id).subscribe(area=>{
  				this.subjectArea=area
  			})
  		}	

		this.openingSkillService.getOpeningSkillComplete(this.job_opening.id).subscribe(openingSkill=>{
  			this.openingSkill=openingSkill
  			// console.log(this.openingSkill)
  		})

  		this.openingProgrammeService.getStudyProgrammeByOrganization(this.job_opening.id).subscribe(programme=>{
  			this.openingProgramme=programme
  			// console.log(programme)
  		})

  		this.openingLanguageService.getOpeningLanguage(this.job_opening.id).subscribe(languages=>{
  			this.openingLanguage=languages;
       		// console.log(this.openingLanguage)
  		})

  		
  		this.organizationService.getOrganization(this.job_opening.contact_id).subscribe (organization=>{
  			this.organization=organization
  			
  			
			
  			this.jobApplicationStatusLogService.getJobASLShow(this.addMessage.get('from_user_id').value,this.id).subscribe(jab=>{
  				this.chipStatus=jab[0];
  				//preguntar si esta contratado o esta postulado y mostrar la caja de texto
  				// console.log(this..type.includes('hiring'), "contratado")

  				if (jab[1]=='1'){
  					this.canApplication=false;
  				}  				
				console.log(jab[1])  				


  			})


  			this.jobTypeService.getJobType(this.job_opening.job_type_id).subscribe(type=>{
			this.job_type=type
			// console.log(this.job_type)
			

			if (this.job_opening.city_id!=null) {
				this.cityService.getCity(this.job_opening.city_id).subscribe(city=>{
					this.city=city
					this.stateService.getState(this.city.state_id).subscribe(state=>{
						this.state=state
						this.countryService.getCountry(this.state.country_id).subscribe(country=>{
	 						this.country=country
 							this.show=true
 							// console.log(this.country)
						})
					})
				})	
			}else{ this.show=true}

			})

  			// console.log(this.organization)
  		})
 
  	}


  	send(){
            
      if ( this.addMessage.get('text').value.trim()=="") { 
        this.uiServiceService.AlertaOK("El mensaje no puede estar vacio","info","")
        this.addMessage.get('text').setValue("") 
      } else {
    		this.addMessage.get('date_sent').setValue(this.getNowDate())
    		this.jobOpeningService.getIsOpen(this.id).subscribe(val=>{
    			if (val==1)
    			{
    				console.log("1")
    				this.messageService.addMessage(
    					this.addMessage.get('from_user_id').value,
    					this.addMessage.get('to_user_id').value,
    					this.addMessage.get('text').value,
    					this.addMessage.get('html_text').value,
    					this.addMessage.get('date_sent').value).subscribe(message=>{
    						this.message=message
  						console.log(this.addMessage.get('from_user_id').value,
    							this.id,
    							this.message.id,
    							this.addMessage.get('date_sent').value,
    							'application')

    						this.jobApplicationStatusLogService.addJobASL(
    							this.addMessage.get('from_user_id').value,
    							this.id,
    							this.message.id,
    							this.addMessage.get('date_sent').value,
    							'application',
    							this.addMessage.get('text').value
    							).subscribe(jASL=>{
    								console.log(jASL)
    								// this.VacantesPage.ngOnInit();
    								
    								this.navCtrl.navigateRoot("/vacantes");
    							})
    						
    					})

    			}
    			else{
    				// this.vacantesPage.ngOnInit();
    				this.uiServiceService.alertaLeave("Lo sentimos, esta vacante ha sido cerrada","/vacantes")
    			}
    		})
      }


  	}
  	
  	imprimir(){
 	this.addMessage.get('date_sent').setValue(this.getNowDate())
	console.log(this.addMessage.value)
  	}

  	 

  	initForm() {
  	this.storage.get('candidate').then(candidate => {
  		this.candidate = JSON.parse(candidate);
  		console.log(this.candidate)
  		this.addMessage.get('html_text').setValue('Ver CV: <a href="'+this.URL+"/candidate/profile?id="+this.candidate.user_id+'">'+this.candidate.firstname+" "+this.candidate.lastname+"</a>")
  		this.addMessage.get('from_user_id').setValue(this.candidate.user_id) 
  	})

    this.addMessage = new FormGroup({
    	from_user_id : new FormControl('',Validators.required),
    	to_user_id: new FormControl(this.job_opening.contact_id,Validators.required),
		text: new FormControl('',Validators.required),
		html_text : new FormControl(''),
		date_sent: new FormControl('')  		
    });
  	}

  getNowDate(){
  var date = new Date(); //Fecha actual
  var monthN = date.getMonth()+1; //obteniendo mes
  var dayN = date.getDate(); //obteniendo dia
  var year = date.getFullYear(); //obteniendo año
  var HH = date.getHours();
  var MM = date.getMinutes();
  var SS = date.getSeconds();
  var day
  var month
  var HHH
  var MMM
  var SSS
  console.log(date)
  
  //horas
  if(HH<10)
   HHH='0'+HH.toString(); //agrega cero si el menor de 10
  else
  	HHH =HH

  if(MM<10)
   MMM='0'+ MM.toString(); //agrega cero si el menor de 10
  else
  	MMM = MM

  if(SS<10)
   SSS='0'+SS.toString(); //agrega cero si el menor de 10
  else
  	SSS = SS




  if(dayN<10)
    day='0'+dayN; //agrega cero si el menor de 10
  else
  	day =dayN

  if(monthN<10)
    month='0'+monthN //agrega cero si el menor de 10
  else
  	month=monthN

  console.log(year+"-"+month+"-"+day+" "+HHH+":"+MMM+":"+SSS)
  return year+"-"+month+"-"+day+" "+HHH+":"+MMM+":"+SSS;
  }



  async presentToast(type:string) {
  	switch (type) {
  		case "invitation":
  			var message='El contacto de esta vacante te ha enviado una invitacion';
  			break;
  		case "application":
  			var message='Ya te encuentras postulado en esta vacante';
  			break;
  			case "hiring":
  			var message='Has sido contratado por el contacto de esta vacante';
  			break;
  		default:
  			var message='Sin interacciones';
  			break;
  	}
  	
    const toast = await this.toastController.create({
      message ,
      duration: 2000
    });
    toast.present();
  }




}
