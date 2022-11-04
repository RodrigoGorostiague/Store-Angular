import { Product } from './../../pages/products/Interfaces/product.interface';
import { Injectable } from '@angular/core';
import {  Observable, BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root'
  })
export class shoppingCartService {
  products: Product[] = [];

/**
 * Dividimos las responsabilidades, estilo reactivo de programacion, las funciones peranecen privadas y son llaadas en una unica funcion q luego llaareos desde products.component.ts
 */
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }


  updateCart(product: Product): void{
    this.addToCart(product);
    this.quantityProduct();
    this.calcTotal();
  }

  private quantityProduct(): void{
    const quiantity = this.products.reduce((acc, prod)=> acc += prod.quantity,0);
    this.quantitySubject.next(quiantity);
  }

  private addToCart(product: Product): void{
    const isProductToCart = this.products.find(({id})=> id === product.id);
    if(isProductToCart){
      isProductToCart.quantity +=1;
    }
    else{
      this.products.push({...product, quantity:1})
    }
    this.cartSubject.next(this.products)
  }

  private calcTotal (): void{
    const total = this.products.reduce((acc, prod)=> acc+=(prod.price * prod.quantity), 0);
    this.totalSubject.next(total);
  }

  public resetCart(): void{
      this.cartSubject.next([]);
      this.totalSubject.next(0);
      this.quantitySubject.next(0);
      this.products = [];
  }
}
