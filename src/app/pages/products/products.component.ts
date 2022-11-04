import { shoppingCartService } from './../../shared/services/shopping-cart.service';
import { Product } from './Interfaces/product.interface';
import { ProductsService } from './services/products.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(private productSvc: ProductsService, private shoppingCartSvc: shoppingCartService) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap((products: Product[]) => this.products = products)
    )
    .subscribe();
  }
  addToCart(product: Product): void{
    this.shoppingCartSvc.updateCart(product);
  }
}
