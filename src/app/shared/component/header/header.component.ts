import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private reouter: Router ) { }

  ngOnInit(): void {
  }
  goToCheckOut(): void{
    this.reouter.navigate(['/checkout']);
  }

}
