import { Component, OnInit } from '@angular/core';
import {faArrowRight,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  arrowRight = faArrowRight;
  carrito = faShoppingCart;

  constructor(private contadorService: ContadorCarritoService) { }

  ngOnInit(): void {
    this.contadorService.actualizarContador();
  }

}
