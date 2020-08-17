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

  	constructor(private jobApplicationStatusLogService : JobApplicationStatusLogService,
    		    private storage: Storage,private navCtrl: NavController
			  	) { }

  	ngOnInit() {
    	this.storage.get('id').then((id) => {
    		this.jobApplicationStatusLogService.getApplications(id).subscribe(applications=>{
    			this.applications=applications;
	    		console.log(applications)
    		})
    	})
  	}

  	goSeeVacant(id:string){
      console.log(id)
      this.navCtrl.navigateForward('/vacante/'+id);

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
