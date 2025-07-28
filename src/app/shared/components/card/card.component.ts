import { Component, input } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  
  myProduct = input.required<IProduct>()
  
  getFullStarsCount(): number {
    return Math.floor(this.myProduct().rating.rate);
  }

  getFraction(): number {
    return this.myProduct().rating.rate % 1;
  }

  getEmptyStarsCount(): number {
    return 5 - Math.ceil(this.myProduct().rating.rate);
  }

  getFractionWidth(): string {
    return `${this.getFraction() * 100}%`;
  }


}
