import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { GridCardsComponent } from '../../shared/components/grid-cards/grid-cards.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [GridCardsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  //  constructor(private flowbiteService: FlowbiteService) {}

  private readonly flowbiteService = inject(FlowbiteService);
  private readonly productsService = inject(ProductsService);

  productsList: WritableSignal<IProduct[]> = signal([])
  apiError = signal(false);



  ngOnInit(): void {
    this.useFlowbite()
    this.callGetAllProducts()
    
  }

  useFlowbite(): void{
    this.flowbiteService.loadFlowbite((_flowbite) => {
      initFlowbite();
    });
  }

  callGetAllProducts(): void{
    this.productsService.getAllProducts().subscribe({
      next: (res)=>{
        this.productsList.set(res)
        console.log(this.productsList());
        this.apiError.set(false);
      },
      error: (err)=>{
        console.log(err);
         this.apiError.set(true);
        
      }
    })
  }
}
