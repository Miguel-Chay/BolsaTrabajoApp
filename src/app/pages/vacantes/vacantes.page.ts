import { Component, OnInit } from '@angular/core';
import { JobOpeningService } from '../../services/job-opening.service';
import { environment } from 'src/environments/environment';
import { Vacant } from '../../interfaces/interfaces';
import { PopfilterComponent } from '../../components/popfilter/popfilter.component';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.page.html',
  styleUrls: ['./vacantes.page.scss'],
})
export class VacantesPage implements OnInit {

	URL = environment.urlPhotos;
	logo=this.URL+"/btuady/public_html/files/logo/organization/"
	jobsOpening:Vacant;
	end=10;
	total:any;
	textFinder="";
	buscar=true;
  
  	constructor(
  		private jobOpeningService : JobOpeningService,
  		private popoverCtrl:PopoverController) { }

  	ngOnInit() {
  		this.jobOpeningService.getJobsListOpen().subscribe (jobs=>{
  			this.jobsOpening=jobs
  			 
  			this.total=Object.keys(jobs).length
  			 
  		})
  	}

  	async showpop(event){
  		const popover= await this.popoverCtrl.create({
  			component:PopfilterComponent,
  			event:event,
  			mode:'ios',
        cssClass: 'my-pop-over-style',
        backdropDismiss:false
  		});
  		await popover.present();
      const{data}=await popover.onWillDismiss();
      console.log("padre",data)
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
