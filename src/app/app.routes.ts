import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path: '' , redirectTo: 'products', pathMatch: 'full'},
    {path: 'products' , component: ProductsComponent , title: 'Products'},
    {path: 'product-details/:id' , component: ProductDetailsComponent, title: 'Product Details'},
    {path: '**', component: NotfoundComponent, title: 'Notfound !'}
];
