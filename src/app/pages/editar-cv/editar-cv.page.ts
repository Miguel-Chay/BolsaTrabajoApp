import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

import { CvService } from '../../services/Cv.service';


import { Cv } from '../../interfaces/interfaces';

@Component({
  selector: 'app-editar-cv',
  templateUrl: './editar-cv.page.html',
  styleUrls: ['./editar-cv.page.scss'],
})
export class EditarCvPage implements OnInit {

  val: string = null;
  cv: Cv={}

  constructor(private cvService : CvService,private storage: Storage) { }

  ngOnInit() {

  	this.storage.get('id').then((val) => { 
  	this.cvService.getCv(val).subscribe( cv=>{this.cv=cv
      console.log(this.cv)
    })
  })
  }


  UpdateCv(form: NgForm) {
    this.cvService.updateCv(this.cv.candidate_id,this.cv.status, this.cv.summary).subscribe( cv=>{});
  }

  imprimir(){
  	console.log(this.cv)
  }


}
