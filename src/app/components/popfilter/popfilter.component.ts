import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { JobTypeService } from '../../services/job-type.service';
import { SubjectAreaService } from '../../services/subject-area.service';
import { StudyProgrammeService } from '../../services/study-programme.service';
import { JobType ,SubjectArea,StudyPrograme} from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular'; 
@Component({
  selector: 'app-popfilter',
  templateUrl: './popfilter.component.html',
  styleUrls: ['./popfilter.component.scss'],
})
export class PopfilterComponent implements OnInit {
	jobType: JobType;
	studyPrograme:StudyPrograme;
	subjectArea: SubjectArea;
	findData: FormGroup;
	years=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
  constructor(private jobTypeService :JobTypeService,
  				private subjectAreaService :SubjectAreaService,
  				private studyProgrammeService :StudyProgrammeService,
  				private popoverCtrl:PopoverController) { this.initForm() }

  ngOnInit() {
  	this.jobTypeService.getJobsListType().subscribe( jobType=>{
  		this.jobType=jobType
  	})
  	this.subjectAreaService.getSubjectAreas().subscribe( subjectArea=>{
  		this.subjectArea=subjectArea
  	})

  }

  find(){
  	// console.log(this.findData.value)
  	this.popoverCtrl.dismiss({
  		year_Experience:this.findData.get('year_Experience').value,
  		jobType:this.findData.get('job_Type').value,
  		city:this.findData.get('city').value,
  		studyPrograme:this.findData.get('studyPrograme').value,
  		subjectArea:this.findData.get('subjectArea').value,
  		sueldo:this.findData.get('sueldo').value,
  	})
  }
  initForm() {
  	 

    this.findData = new FormGroup({
  		year_Experience: new FormControl(''),
  		job_Type: new FormControl(''),
  		city: new FormControl(''),
  		studyPrograme: new FormControl(''),
  		subjectArea: new FormControl(''),
		sueldo: new FormControl('',[ Validators.pattern("^[0-9]*$")])
    });
  }

}
