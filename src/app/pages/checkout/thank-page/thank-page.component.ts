import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-page',
  template: `<div class="conteiner">
  <h1 class="title">Muchas Gracias</h1>
  <p class="content">Su orden etsa en camino</p>
  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus accusamus sapiente atque ea adipisci optio omnis similique expedita tempore? Sint voluptatibus debitis minus consectetur eius nisi blanditiis dicta possimus repudiandae!</span>
</div>`,
  styleUrls: ['./thank-page.component.css']
})
export class ThankPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
