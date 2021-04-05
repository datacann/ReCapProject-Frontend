  
import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string, search:string): Car[] {
    if(search=="brand")
    {
      filterText= filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
    }
    else if(search=="color")
    {
      filterText= filterText?filterText.toLocaleLowerCase():""
      return filterText?value.filter((c:Car)=>c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1)
      :value;
    }
    else{
      filterText= filterText?filterText.toLocaleLowerCase():""
      return filterText?value.filter((c:Car)=>c.modelYear.toString().indexOf(filterText)!==-1)
      :value;
    }
  }

}