import { Product } from './../Interfaces/product.interface';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
    @Input() product!: Product;
    @Output() addToCartClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.addToCartClick.emit(this.product);
    console.log('click', this.product);
  }

}
