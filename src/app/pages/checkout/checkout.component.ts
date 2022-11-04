import { ProductsService } from './../products/services/products.service';
import { Router } from '@angular/router';
import { Product } from './../products/Interfaces/product.interface';
import { shoppingCartService } from './../../shared/services/shopping-cart.service';
import { Order, Detail } from './../../shared/interfaces/detail-orders';
import { Store } from './../../shared/interfaces/store';
import { delay, switchMap, tap } from 'rxjs';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  };
  isDelivery: boolean = true;
  stores: Store[]=[];
  cart: Product[]=[];
  ruter: any;
  constructor(private dataSvc: DataService,
              private shopingCartSvc: shoppingCartService,
              private ruoter: Router,
              private productsSvc: ProductsService
              ) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  onPickUpOrDelivery(value: boolean): void{
    this.isDelivery=value;
  }
  onSubmit({ value: formData }: NgForm): void{
    const data: Order = {
      ...formData,
      data: this.dateCurrencyDate,
      isDelivery: this.isDelivery,
    }
    this.dataSvc.saveOrder(data).pipe(
      switchMap((order) => {
        const orderId = order.id;
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailOrder({ details, orderId });
      }),
      tap(()=> this.ruter.navigate([`/checkout/gracias-por-su-compra`])),
      delay(2000),
      tap(()=> this.shopingCartSvc.resetCart())
    )
    .subscribe();
  }
  private getStores(): void{
    this.dataSvc.getStores()
    .pipe(
      tap((stores: Store[]) =>  this.stores = stores))
    .subscribe();
  }
  private dateCurrencyDate(): string{
    return new Date().toLocaleDateString();
  }
  private prepareDetails(): Detail[] {
    const details: Detail[]= [];
    this.cart.forEach((product: Product) => {
      const {id: productId, name: productName, quantity, stock} = product;
      const updateStock = (stock-quantity);
      this.productsSvc.updateStock(productId, updateStock).pipe(
        tap(() => details.push({productId, productName, quantity}))
      ).subscribe()



    })
    return details;
  }
  private getDataCart(): void{
    this.shopingCartSvc.cartAction$.pipe(
        tap((products: Product[])=> this.cart = products )
    ).subscribe();
  }
  private checkEmptyCart(): void{
    this.shopingCartSvc.cartAction$.pipe(
      tap((product: Product[])=>{
        if(Array.isArray(product)&&(product.length)){
          this.ruoter.navigate([`/products`]);
        }
      })
    )
    .subscribe()
  }
}
