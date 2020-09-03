import { Component, OnInit, ViewChild  } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 
import { Platform,LoadingController} from '@ionic/angular'
import { Storage } from '@ionic/storage';

import { CourseService } from '../../services/course.service';

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
  


  async opcionesCursos(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil('/editar-curso/'+id)//manda la ruta mas el parametro id 
    if(this.confirm== "delete"){
      // console.log("se elimino el curso "+id )
      let reconfirm = await this.uiService.opcionesMiperfilDelete("¿Desea eliminar este curso de forma permanente?" )//manda la ruta mas el parametro id 
      if (reconfirm=="delete") {       
        this.courseService.deleteCourse(id).subscribe(Response => {this.ionViewWillEnter()})
      } 
    }
   }

   doRefresh(event) {
    setTimeout(() => {
        this.ionViewWillEnter()
        event.target.complete();
    }, 1500);
  }


}
