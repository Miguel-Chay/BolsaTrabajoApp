import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrosVacant'
})
export class FiltrosVacantPipe implements PipeTransform {

  transform(array : any[],
            job : string,
            years:string,
            typeJob: string,
            city:string,
            studyPrograme:string,
            subjectArea : string,
            sueldo : string): any[] {
  	//filtro de busqueda de trabajo
  	if(job==''){return array}

  	job=job.toLowerCase()
  	if (years=="") {
  		console.log("no tiene nada")
  	}
  	console.log("años "+years)
  	console.log("typeJob "+typeJob)
  	console.log("city "+city)
  	console.log("studyPrograme "+studyPrograme)
  	console.log("subjectArea "+subjectArea)
  	console.log("sueldo "+sueldo)


  	
   	
   	//filtro de años de experiencia


    //filtro de typeJob
    array=array.filter(item=>{return item.job_type_id.toLowerCase().includes(typeJob)  })
    //filtro de ciudad
    //array=array.filter(item=>{return item.city_id.toLowerCase().includes(city)  })
    //filtro de studyPrograme plan de estudio
    console.log(array)
    //filtro de subjectArea area de trabajo
    //array=array.filter(item=>{return item.subject_area_id.toLowerCase().includes(subjectArea)  })
    //filtro de sueldo


















   	//busqueda de nombre de trabajo
   	array=array.filter(item=>{return item.job_title.toLowerCase().includes(job)	})

   	return array
  }

}
