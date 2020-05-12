import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators  } from '@angular/forms';

import { WorkExperienceService } from '../../services/work-experience.Service';
import { LineBusinessService } from '../../services/line-business.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';



@Component({
  selector: 'app-prueb',
  templateUrl: './prueb.page.html',
  styleUrls: ['./prueb.page.scss'],
})

export class PruebPage implements OnInit {


  constructor(){ 
 }

  ngOnInit() {
  }
 

   
 initForm() {
	}	


doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
}
