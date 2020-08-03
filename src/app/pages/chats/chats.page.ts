import { Component, OnInit } from '@angular/core';
import { JobApplicationStatusLogService } from '../../services/job-application-status-log.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import {  NavController } from '@ionic/angular';

import { contactsChat } from '../../interfaces/interfaces';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

	URL = environment.urlPhotos;
	logo=this.URL+"/btuady/public_html/"
	chats: contactsChat;

  	constructor(public jobApplicationStatusLogService: JobApplicationStatusLogService,
			  	private storage: Storage,
			  	private navCtrl: NavController,
  				){}

  	
  	ngOnInit(){}

 	ionViewWillEnter() {
  		this.storage.get('id').then((val) => { 
  		this.jobApplicationStatusLogService.getContacts(val).subscribe(chats=>{
  			this.chats=chats;
  			console.log(this.chats)
  			})
  		})
  	
  	}

  	gotoChat(id:string,read:string){
      if (read=="1")
      {
        console.log("tiene un menssage sin leer")
      }
      else{
        console.log("todos los mensajes estan leidos")

      }
      // console.log(id)
      this.navCtrl.navigateForward('/chat/'+id);

    }


  	doRefresh( event ){

  		// console.log('Begin async operation');

    	setTimeout(() => {
  			this.ionViewWillEnter()
      		// console.log('Async operation has ended');
      		event.target.complete();
    	}, 2000);
  	}

}
