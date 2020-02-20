import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CandidateService } from '../../services/candidate.service';
import { CityService } from '../../services/city.service';
import { Candidate,City } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio-perfil-basico',
  templateUrl: './inicio-perfil-basico.page.html',
  styleUrls: ['./inicio-perfil-basico.page.scss'],
})
export class InicioPerfilBasicoPage implements OnInit {

  val: string = null;
  photoRout: string = "http://localhost/btuady/public_html/files/photo/";
  edad: string = null;
  
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

	city: City = {
    id : '',
    name : '',
    state_id : ''
  }

  constructor( public menuCtrl: MenuController, private storage: Storage, private candService : CandidateService,
  private cityService : CityService ) {}

  
  translateInfo()
  {

    if(this.candidate.sex=="male")
    {
     this.candidate.sex="Hombre" 
    }
    else{
      this.candidate.sex="Mujer" 
    } 

    if(this.candidate.marital_status=="married")
    {
      this.candidate.marital_status="Casado" 
    }
    else{
      this.candidate.marital_status="Soltero" 
    } 
 
    if(this.candidate.photo == null)
    {
      this.photoRout="./assets/image/"+this.candidate.sex+".png";
    }
    else
    {
      this.photoRout= this.photoRout + this.candidate.photo;
    }

    //console.log(this.calculateAge(this.candidate.birth_date));
    this.edad = this.calculateAge(this.candidate.birth_date).toString() ;
    this.cityService.getCity(this.candidate.city_id).subscribe( city=>{this.city=city})
    
  }


  ionViewWillEnter() //carga antes de entrar
  {
  	this.menuCtrl.enable(true);

    this.storage.get('id').then((val) => { 
      this.candService.getCandidate(val).subscribe(
        candidato=>{ 
          this.candidate=candidato; 
          //console.log(this.candidate);  
          this.translateInfo();



        })

    })


  }
  


  ngOnInit()//carga al entrar 
  {}

  

  calculateAge(birthday) {
    var birthday_arr = birthday.split("-");
    //console.log(birthday_arr);
    var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
    //console.log(birthday_date);
    var ageDifMs = Date.now() - birthday_date.getTime();
    //console.log(ageDifMs);
    var ageDate = new Date(ageDifMs);
    //console.log(ageDate);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
 