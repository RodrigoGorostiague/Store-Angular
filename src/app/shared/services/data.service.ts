import { Detail, DetailOrders, Order } from './../interfaces/detail-orders';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiURL}/stores`);
  }
  saveOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${this.apiURL}/orders`, order);
  }
  saveDetailOrder(detail: DetailOrders): Observable<DetailOrders>{
    return this.http.post<DetailOrders>(`${this.apiURL}/detailsOrders`, detail);
  }
}
