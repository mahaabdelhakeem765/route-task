import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'searchSort'
})
export class SearchSortPipe implements PipeTransform {

  transform(
    products: IProduct[],
    searchText: string,
    sortByPrice: 'asc' | 'desc' | null,
    sortByTitle: 'asc' | 'desc' | null
  ): IProduct[] {
    if (!products) return [];

    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sortByPrice) {
      filtered.sort((a, b) =>
        sortByPrice === 'asc' ? a.price - b.price : b.price - a.price
      );
    }

    if (sortByTitle) {
      filtered.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortByTitle === 'asc'
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    }

    return filtered;
  }

}
