import { Component, OnInit, ViewChild  } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 
import { Platform,LoadingController} from '@ionic/angular'
import { Storage } from '@ionic/storage';

import { CourseService } from '../../services/course.Service';

import { UiServiceService } from '../../services/ui-service.service';

import { Course } from '../../interfaces/interfaces';

@Component({
  selector: 'app-mp-cursos',
  templateUrl: './mp-cursos.page.html',
  styleUrls: ['./mp-cursos.page.scss'],
})
export class MpCursosPage implements OnInit {

  val: string = null;
  confirm:string ;
  course: Course;

  constructor( public actionSheetController: ActionSheetController, private courseService : CourseService,
    private storage: Storage,private uiService: UiServiceService) { }

  ngOnInit() {
  }


  ionViewWillEnter(){

    this.storage.get('id').then((val) => { 
      this.courseService.getCoursesComplete(val).subscribe( course=>{this.course=course
      console.log(this.course)
      })
    })
  }




  async opcionesCursos() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Editar',
        icon: 'Create',
        handler: () => {
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
