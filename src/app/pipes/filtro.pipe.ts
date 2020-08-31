import { Pipe, PipeTransform } from '@angular/core';
//este filtro se usa en 
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(array : any[],
            text : string,
            column : string): any[] {

  	if(text==''){
  		return array
  	}

  	text=text.toLowerCase()
  	// console.log(text)

  	 // console.log(array.filter(item=>{return item[column].toLowerCase().includes(text)  }), array.filter(item=>{return item[column].toLowerCase().includes(text)  }).length )
  	return array.filter(item=>{return item[column].toLowerCase().includes(text)	})
  }

}
