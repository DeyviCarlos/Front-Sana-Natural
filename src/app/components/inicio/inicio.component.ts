import { Component, OnInit } from '@angular/core';
import {faArrowRight,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  arrowRight = faArrowRight;
  carrito = faShoppingCart;

  constructor() { }

  ngOnInit(): void {
  }

}
