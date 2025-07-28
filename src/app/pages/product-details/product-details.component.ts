import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  productId: WritableSignal<string> = signal('');
  productData: WritableSignal<IProduct> = signal({} as IProduct)
  hasError = signal(false);


  ngOnInit(): void {
    this.getProductId()
  }

  getProductId(): void{
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        // console.log(res.get('id'));
        this.productId.set(res.get('id')!)
        this.getSingleProductData()
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  getSingleProductData(): void{
    this.hasError.set(false);
    this.productsService.getSingleProduct(this.productId()).subscribe({
      next: (res)=>{
        this.productData.set(res);
        console.log(this.productData());
        
      },
      error: (err)=>{
        console.log(err);
        this.hasError.set(true);
        
      }
    })
  }

  // rating
  getFullStarsCount(): number {
    return Math.floor(this.productData().rating.rate);
  }

  getFraction(): number {
    return this.productData().rating.rate % 1;
  }

  getEmptyStarsCount(): number {
    return 5 - Math.ceil(this.productData().rating.rate);
  }

  getFractionWidth(): string {
    return `${this.getFraction() * 100}%`;
  }

}
