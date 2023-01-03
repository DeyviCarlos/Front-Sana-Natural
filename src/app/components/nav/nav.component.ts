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

  buscar = "";
  constructor(private fb:FormBuilder) { 
    this.formBuscar = this.fb.group({
      cadena: ['']
    });
  }

  ngOnInit(): void {
    this.buscarProducto()
  }
  buscarProducto(){
    
    this.buscar = this.formBuscar.get('cadena')?.value
    console.log(this.buscar)
  }

}
