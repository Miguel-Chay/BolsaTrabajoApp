import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators  } from '@angular/forms';

import { WorkExperienceService } from '../../services/work-experience.service';
import { LineBusinessService } from '../../services/line-business.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';



@Component({
  selector: 'app-prueb',
  templateUrl: './prueb.page.html',
  styleUrls: ['./prueb.page.scss'],
})

export class PruebPage implements OnInit {

  addData: FormGroup;
  constructor(){ 
 }

  ngOnInit() {
    
    this.addData = new FormGroup({
      id1 : new FormControl(''),
      id2 : new FormControl(''),
      id3 : new FormControl(''),
      id4 : new FormControl(''),
      id5 : new FormControl(''),
      id6 : new FormControl(''),
      id7: new FormControl(''),
      id8 : new FormControl(''),
      id9 : new FormControl(''),
      id10 : new FormControl(''),
      id11 : new FormControl(''),
      id12 : new FormControl(''),
      id13 : new FormControl(''),
      id14 : new FormControl(''),
      id15 : new FormControl(''),
      
    });



  }
 

   
 imprimir() {
   console.log(this.addData.value)
	}	



  
}
