import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { AcademicTraining } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-mp-form-academica',
  templateUrl: './mp-form-academica.page.html',
  styleUrls: ['./mp-form-academica.page.scss'],
})
export class MpFormAcademicaPage implements OnInit {
  academicTraining: AcademicTraining[];
  confirm: string;

  constructor(private educationService: EducationService, private storage: Storage, private uiService: UiServiceService ) { }

  ngOnInit() {
    this.storage.get('id').then((id) => {

      this.educationService.getEducation(id).subscribe(academicTraining => {
        this.academicTraining = academicTraining;
        console.log(academicTraining);
      });

    });
  }

  async opcionesAcademic(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil('/editar-exp-laboral/'+id)//manda la ruta mas el parametro id 
    if(this.confirm== "delete"){
      //this.workexperienceService.deleteWorkExperience(id).subscribe(Response => {this.ionViewWillEnter()});
    }
   }

}


