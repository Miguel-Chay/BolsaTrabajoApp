import { Component, OnInit } from '@angular/core';
import { Applications } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { PopoverController,NavParams,NavController } from '@ionic/angular';

import { JobApplicationStatusLogService } from '../../services/job-application-status-log.service';


@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.page.html',
  styleUrls: ['./postulaciones.page.scss'],
})
export class PostulacionesPage implements OnInit {

	URL = environment.urlPhotos;
	logo=this.URL+"/btuady/public_html/"
	applications: Applications;
	open0:boolean=false;
	color0="gold";
	open1:boolean=false;
	color1="gold";
	open2:boolean=false;
	color2="gold";
  	constructor(private jobApplicationStatusLogService : JobApplicationStatusLogService,
    		    private storage: Storage,private navCtrl: NavController
			  	) { }

  	ngOnInit() {
    	this.storage.get('id').then((id) => {
    		this.jobApplicationStatusLogService.getApplications(id).subscribe(applications=>{
    			this.applications=applications;
	    		console.log(applications)
	    		this.open0=true
	    		this.open1=true
	    		this.open2=true
    		})
    	})
  	}

  	goSeeVacant(id:string){
      console.log(id)
      this.navCtrl.navigateForward('/vacante/p/'+id);

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

  	expand(number){
  		if (number==1) {
  			this.open1=!this.open1
  			if(this.open1==true)
  				this.color1="gold"
  			else
  				this.color1="light"
  		}
  		if (number==2) {
  			this.open2=!this.open2
  			if(this.open2==true)
  				this.color2="gold"
  			else
  				this.color2="light"
  		}
  		if (number==0) {
  			this.open0=!this.open0
  			if(this.open0==true)
  				this.color0="gold"
  			else
  				this.color0="light"
  		}
  		// console.log(number)
  	}


}
