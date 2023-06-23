import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContadorCarritoService {

  contadorCarrito: Subject<any> = new Subject<any>();

  listaProducto:any = [];
  constructor() { }


  actualizarContador(){
    this.listaProducto = JSON.parse(localStorage.getItem('listaproductos') || '[]');

    let contadorActual = this.listaProducto.length;

    this.contadorCarrito.next(contadorActual);
  }


}
