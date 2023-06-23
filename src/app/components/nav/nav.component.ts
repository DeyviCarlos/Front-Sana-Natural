import { Component, OnInit, Input } from '@angular/core';
import {faShoppingCart,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  //iconos
  carrito = faShoppingCart;
  sigout = faSignOutAlt;

  //Componente hijo
  //contador del carrito de compras
  //se declara la variable que será usa de parametro por el padre
  // @Input() contadorhijo1 = 0;

  formBuscar: FormGroup;

  //contador actual ----- no se actualiza de manera dinamica
  contador: any;
  // listaProducto: any = [];

  token:any = false;
  cliente_session: any;

  buscar = "";
  constructor(private fb:FormBuilder,private authService: AuthService,
    private router:Router,private contadorService: ContadorCarritoService) { 
    this.formBuscar = this.fb.group({
      cadena: ['']
    });
  }

  ngOnInit(): void {
    this.llenarContadorCarrito()
    this.token = this.authService.verificarToken()
    this.llenarUsuarioSesion()
  }

  llenarContadorCarrito(){

    this.contadorService.contadorCarrito.subscribe( data =>
      this.contador = data
    )
  
  }
  //en caso el buscador esté en la navegación
  buscarProductosNombre(){
    this.buscar = this.formBuscar.get('cadena')?.value
    console.log(this.buscar)

    // this.router.navigate(['/productos/',this.buscar])
  }
  llenarUsuarioSesion(){
    console.log(localStorage.getItem('usuario_nombre'))
    this.cliente_session = localStorage.getItem('usuario_nombre')
  }

  cerrarSesion(){
    this.authService.logout();
  }



}
