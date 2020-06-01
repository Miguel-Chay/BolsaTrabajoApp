import { Component, OnInit } from '@angular/core';
import { JobOpeningService } from '../../services/job-opening.service';
import { environment } from 'src/environments/environment';
import { Vacant } from '../../interfaces/interfaces';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { PopfilterComponent } from '../../components/popfilter/popfilter.component';
import { PopoverController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.page.html',
  styleUrls: ['./vacantes.page.scss'],
})
export class VacantesPage implements OnInit {

	URL = environment.urlPhotos;
	logo=this.URL+"/btuady/public_html/files/logo/organization/"
	jobsOpening:Vacant;
  findData: FormGroup;
	end=10;
	total:any;
	textFinder="";
	buscar=true;
  
  	constructor(
  		private jobOpeningService : JobOpeningService,
  		private popoverCtrl:PopoverController) {this.initForm() }

  	ngOnInit() {
  		this.jobOpeningService.getJobsListOpen().subscribe (jobs=>{
  			this.jobsOpening=jobs
  			 
  			this.total=Object.keys(jobs).length
  			 
  		})
  	}

  	async showpop(event){
  		const popover= await this.popoverCtrl.create({
  			component:PopfilterComponent,
        componentProps:{
          year_Experience:this.findData.get('year_Experience').value,
          job_Type:this.findData.get('job_Type').value,
          city:this.findData.get('city').value,
          study_Programe:this.findData.get('study_Programe').value,
          subject_Area:this.findData.get('subject_Area').value,
          sueldo:this.findData.get('sueldo').value},
  			event:event,
  			mode:'ios',
        cssClass: 'my-pop-over-style',
        backdropDismiss:false
  		});
  		await popover.present();
      const{data}=await popover.onWillDismiss();

      this.findData.get('year_Experience').setValue(data.year_Experience),
      this.findData.get('job_Type').setValue(data.job_Type),
      this.findData.get('city').setValue(data.city),
      this.findData.get('study_Programe').setValue(data.study_Programe),
      this.findData.get('subject_Area').setValue(data.subject_Area),
      this.findData.get('sueldo').setValue(data.sueldo)      
      console.log("padre",this.findData.value)
  	}

    initForm() {
      this.findData = new FormGroup({
        year_Experience: new FormControl(''),
        job_Type: new FormControl(''),
        city: new FormControl(''),
        study_Programe: new FormControl(''),
        subject_Area: new FormControl(''),
        sueldo: new FormControl('',[ Validators.pattern("^[0-9]*$")])
      });
    }  


  	find(event:any){
  		this.textFinder=event.detail.value
  		// console.log(event.detail.value)
  	}
  	showSearchBar(){
  		if(this.buscar){
  		this.buscar=false	
  		}
  		else{
  			this.buscar=true
  		}
  	}

  	// find(event){
  // 	if(this.valstart==0){
  // 		this.valstart=1
  // 		console.log("cambio de valores = " +this.valstart)
  // 	}
  // 	else{
  // 	// this.value=event.detail.value
  // 	this.valend=5
  // 	console.log("execut teh finder")
  // 	this.textFinder=event.detail.value
  // 	this.addData.get('skill').setValue(this.textFinder)
  // 	}
  // }

  	//da la opcion de elementos para mostrar en la pagina 
  	show(event:any){
  		this.end=event.detail.value
  		// console.log(event.detail.value)
  	}
  	//regresa el tamaño del arreglo con el fin de mostrar o no la palabra (Aptitudes)
  	fun(text){
  		return  Object.keys(text).length
  	}
  	//verifica si es el ultimo arreglo de la lista, estetica 
  	islast(array:any,j:any){
  		if (array[Object.keys(array).length-1]==j) {
  			return true
  		}
  		else{
  			return false	
  		}
  	}


}
