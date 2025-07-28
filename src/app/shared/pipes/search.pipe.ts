import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: IProduct[] , searchText: string): IProduct[] {
    return data.filter( (item)=>item.title.toLowerCase().includes(searchText.toLowerCase()) );
  }

}
