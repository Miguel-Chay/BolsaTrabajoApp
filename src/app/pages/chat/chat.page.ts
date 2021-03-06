import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { OrganizationService } from '../../services/organization.service';
import { environment } from 'src/environments/environment';

import { IonContent,NavController } from '@ionic/angular';

import { Message, Organization } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
	
	contact_id: string;
	cv_id: string;
	messages : Message;
	organization :Organization;
	URL = environment.urlPhotos;
	logo=null
	newMessage="";

	// @ViewChild(IonContent) content:IonContent;
	@ViewChild(IonContent, {static: false}) content: IonContent;




  	constructor(private storage: Storage,
  				private route: ActivatedRoute,
          private navCtrl: NavController,
  				private messageService : MessageService,
  				private organizationService : OrganizationService
  				) { }

  	ngOnInit(){}

    ionViewWillEnter(){

  		this.contact_id = this.route.snapshot.paramMap.get('id');
  		
  		this.storage.get('id').then((id) => {
  			this.cv_id=id;
  			this.messageService.getChat(id,this.contact_id).subscribe(chat=>{
				this.messages = chat
				this.organizationService.getOrganization(this.contact_id).subscribe(org=>{
					this.organization=org
					this.organizationService.getLogo(this.contact_id).subscribe(logo=>{
						if (logo!=null)
						{
							this.logo=this.URL+"/btuady/public_html/"+logo
							console.log(this.logo )

						}
						this.baja();
					})
				})
				this.seeMessage();
				console.log(this.messages)
  			})
  		})

  	 
  		// console.log(this.contact_id)
  	}

  	sendMessage(){
      if (this.newMessage.trim()=="") { 
        this.newMessage=""
      } else {
    		this.messageService.addMessage(this.cv_id,this.contact_id,this.newMessage.trim(),"",this.getNowDate()).subscribe(message=>{
          this.ionViewWillEnter()
    			this.ngOnInit()
    		})
    		console.log(this.cv_id,this.contact_id,this.newMessage.trim(),this.getNowDate())
    		this.newMessage=""
      }
  	}

  	seeMessage(){
      console.log("mensajes:", this.messages)

  		for(let i in this.messages)
		{
			if (this.messages[i].date_read == null && this.messages[i].type=="received"){
				console.log("mensaje " + i + " =   id:  " + this.messages[i].id+"  date_sent: "+this.messages[i].date_sent );
				this.messageService.seeMessages(this.messages[i].id,this.getNowDate()).subscribe(message=>{
          console.log(message)
        })

			}
			// else{
			// 	console.log("no actualiza el mensaje: "+i)
			// }
		}
  	}

  	baja(){
  		this.content.scrollToBottom(10);
  		// console.log("se ejecuta baja")
  	}

    goLinkVacant(id: string){
              this.navCtrl.navigateRoot("/vacante/c/"+id);
              console.log(id+" = vacante")
    }
    goLinkUser(id: string){
              this.navCtrl.navigateRoot("/inicio-perfil-basico");
              console.log(id +" = vacante")
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
  
  //	horas
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

  	// console.log(year+"-"+month+"-"+day+" "+HHH+":"+MMM+":"+SSS)
  	return year+"-"+month+"-"+day+" "+HHH+":"+MMM+":"+SSS;
  }


}
