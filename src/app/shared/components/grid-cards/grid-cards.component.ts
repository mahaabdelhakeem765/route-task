import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { CardComponent } from '../card/card.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { SearchSortPipe } from '../../pipes/search-sort.pipe';


@Component({
  selector: 'app-grid-cards',
  imports: [CardComponent , SearchPipe , FormsModule , SearchSortPipe],
  templateUrl: './grid-cards.component.html',
  styleUrl: './grid-cards.component.css'
})
export class GridCardsComponent implements OnInit{
  private readonly flowbiteService = inject(FlowbiteService);
  products = input<IProduct[] | null>();
  searchItems: WritableSignal<string> = signal('');
  sortByPrice: WritableSignal<'asc' | 'desc' | null> = signal(null);
  sortByTitle: WritableSignal<'asc' | 'desc' | null> = signal(null);

  

  ngOnInit(): void {
    this.useFlowbite()
  }
    useFlowbite(): void{
    this.flowbiteService.loadFlowbite((_flowbite) => {
      initFlowbite();
    });
  }

  setSortByPrice(order: 'asc' | 'desc') {
    this.sortByPrice.set(order);
    this.sortByTitle.set(null);
  }

  setSortByTitle(order: 'asc' | 'desc') {
    this.sortByTitle.set(order);
    this.sortByPrice.set(null);
  }

}
