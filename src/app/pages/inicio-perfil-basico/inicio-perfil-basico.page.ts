import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio-perfil-basico',
  templateUrl: './inicio-perfil-basico.page.html',
  styleUrls: ['./inicio-perfil-basico.page.scss'],
})
export class InicioPerfilBasicoPage implements OnInit {

  val: string = null;
	candidate : Candidate = {
    user_id :'',
    firstname :'',
    lastname :'',
    sex :'',
    birth_date : null,
    marital_status :'',
    curp :'',
    phone :'',
    cellphone :'',
    city_id :'',
    student_id_number :'',
    organization_unit_id :'',
    photo :'',
    work_status : null,
    work_status_date : null,
    token : ''
  }
	

  constructor( public menuCtrl: MenuController, private storage: Storage, private candService : CandidateService ) { 
    
    

  }

  ionViewWillEnter() 
  {
  	this.menuCtrl.enable(true);
  }
  


  ngOnInit() {
    this.storage.get('id').then((val) => {
      this.candService.getCandidate(val).subscribe(candidato=>{
        console.log(candidato);
        this.candidate=candidato;
        console.log(this.candidate);
      });
 
    });
  }



}
/*storage.get('id').then((id) => {
    console.log('Your id is', id);
  });*/