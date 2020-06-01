import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { JobTypeService } from '../../services/job-type.service';
import { SubjectAreaService } from '../../services/subject-area.service';
import { StudyProgrammeService } from '../../services/study-programme.service';
import { JobType ,SubjectArea,StudyPrograme} from '../../interfaces/interfaces';
import { PopoverController,NavParams } from '@ionic/angular'; 


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
  				private popoverCtrl:PopoverController,
          public navParams: NavParams) { this.initForm() }

  ngOnInit() {
  	this.jobTypeService.getJobsListType().subscribe( jobType=>{this.jobType=jobType})
  	this.subjectAreaService.getSubjectAreas().subscribe( subjectArea=>{this.subjectArea=subjectArea})
    this.studyProgrammeService.getallStudyProgrammes().subscribe( studyPrograme=>{this.studyPrograme=studyPrograme})




    // console.log(this.navParams.get('end'))
    this.findData = new FormGroup({
      year_Experience: new FormControl(this.navParams.get('year_Experience')),
      job_Type: new FormControl(this.navParams.get('job_Type')),
      city: new FormControl(this.navParams.get('city')),
      subject_Area: new FormControl(this.navParams.get('subject_Area')),
      study_Programe: new FormControl(this.navParams.get('study_Programe')),
      sueldo: new FormControl(this.navParams.get('sueldo'),[ Validators.pattern("^[0-9]*$")])
    });
      // this.findData.get('year_Experience').setValue(this.navParams.get('year_Experience'))
      // this.findData.get('job_Type').setValue(this.navParams.get('job_Type'))
      // this.findData.get('city').setValue(this.navParams.get('city'))
      // this.findData.get('studyPrograme').setValue(this.navParams.get('studyPrograme'))
      // this.findData.get('subjectArea').setValue(this.navParams.get('subjectArea'))
      // this.findData.get('sueldo').setValue(this.navParams.get('sueldo'))      

      // console.log("hijo", this.findData.value )


  }

  find(){
  	// console.log(this.findData.value)
  	this.popoverCtrl.dismiss({
      // findData:this.findData
  		year_Experience:this.findData.get('year_Experience').value,
  		job_Type:this.findData.get('job_Type').value,
  		city:this.findData.get('city').value,
  		subject_Area:this.findData.get('subject_Area').value,
  		study_Programe:this.findData.get('study_Programe').value,
  		sueldo:this.findData.get('sueldo').value,
  	})
  }
  initForm() {
  	 

    this.findData = new FormGroup({
  		year_Experience: new FormControl(''),
  		job_Type: new FormControl(''),
  		city: new FormControl(''),
  		subject_Area: new FormControl(''),
  		study_Programe: new FormControl(''),
		  sueldo: new FormControl('',[ Validators.pattern("^[0-9]*$")])
    });
  }

}
