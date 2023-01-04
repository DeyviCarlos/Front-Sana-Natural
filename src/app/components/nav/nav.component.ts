import { Component, OnInit } from '@angular/core';
import {faShoppingCart,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  carrito = faShoppingCart;
  sigout = faSignOutAlt;

  formBuscar: FormGroup;

  contador: any;

  buscar = "";
  constructor(private fb:FormBuilder) { 
    this.formBuscar = this.fb.group({
      cadena: ['']
    });
  }

  ngOnInit(): void {
    this.buscarProducto()
    this.llenarContadorCarrito()
  }
  buscarProducto(){
    
    this.buscar = this.formBuscar.get('cadena')?.value
    console.log(this.buscar)
  }
  llenarContadorCarrito(){
    this.contador = JSON.parse(localStorage.getItem('listaproductos') || '[]').length;

    localStorage.setItem('contador',this.contador)
  }
  buscarProductosNombre(){
    
  }
}
