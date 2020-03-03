import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 

import { CandidateService } from '../../services/candidate.service';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { StateService } from '../../services/state.service';
import { UsersService } from '../../services/users.service';
import { OrganizationUnitService } from '../../services/organization-unit.service';
import { CvService } from '../../services/Cv.service';

import { Candidate,City,State,Country,User,OrganizationUnit,Cv } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio-perfil-basico',
  templateUrl: './inicio-perfil-basico.page.html',
  styleUrls: ['./inicio-perfil-basico.page.scss'],
})
export class InicioPerfilBasicoPage implements OnInit {

  val: string = null;
  photoRoutbase: string = "https://localhost/btuady/public_html/files/photo/";
  edad: string = null;
  ciudad: string = null;
  estado: string= null;
  pais: string = null;
  photoRout: string='';

  organizationunit: OrganizationUnit={}
  candidate : Candidate = {}
	city: City = {}
  state: State= {}
  country: Country= {}  
  user: User={}
  cv: Cv={}

  constructor( public menuCtrl: MenuController, private storage: Storage, private candService : CandidateService,
  private cityService : CityService,private stateService : StateService,private countryService : CountryService, 
  private userService : UsersService, private organizationunitService : OrganizationUnitService,private cvService : CvService,
  public alertController: AlertController, public actionSheetController: ActionSheetController,private navCtrl: NavController ) {}
  
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
      this.photoRout= this.photoRoutbase + this.candidate.photo;
    }


    this.edad = this.calculateAge(this.candidate.birth_date).toString() ;
    this.organizationunitService.getOrganizationUnit(this.candidate.organization_unit_id).subscribe(organizationunit=>{this.organizationunit=organizationunit
    })
    this.cvService.getCv(this.candidate.user_id).subscribe( cv=>{this.cv=cv
      console.log(this.cv)
    })

    this.cityService.getCity(this.candidate.city_id).subscribe( city=>{this.city=city
      this.stateService.getState(this.city.state_id).subscribe( state=>{this.state=state
        this.countryService.getCountry(this.state.country_id).subscribe( country=>{this.country=country
          this.imprime()  
        })
      })
    })
  }


  ionViewWillEnter() //carga antes de entrar
  {
  	this.menuCtrl.enable(true);

    this.storage.get('id').then((val) => { 
      this.userService.getUser(val).subscribe(user=>{this.user=user
        this.candService.getCandidate(val).subscribe(candidato=>{this.candidate=candidato
          this.translateInfo();
          
        })

      })

    })
  }
  


  ngOnInit()//carga al entrar 
  {}

  

  calculateAge(birthday) {
    var birthday_arr = birthday.split("-");
    var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  imprime(){
    console.log(this.user)
    console.log(this.candidate)
    console.log(this.country)
    console.log(this.state)
    console.log(this.city)
  }




  async opcionesCv() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Editar',
        icon: 'Create',
        handler: () => {
          this.navCtrl.navigateRoot('/editar-cv');
          console.log('Editar clicked');
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  } 


}
 