import { Component, OnInit } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  eliminar = faTrash;
  
  listaCarrito: any = [];

  DetalleCompra = {
    idCompra: 0,
    montoTotal: 0.00,
    fecha: "00/00/0000",
    hora: "00.00.00",
    idCliente: 0,
    tipoEntrega: "",
    direccion: "",
    telefono: "",
    detalleCompraProducto: []
  };
  cantidad: any;

  montos: any = [];
  montoTotal: any;
  montoLocal: any = [];

  constructor() {
    this.cantidad = 1;
    this.montoTotal = 0.00
   }

  ngOnInit(): void {
    this.obtenerListaCarrito()
  }

  obtenerListaCarrito(){
    this.montoTotal = 0.00
    this.listaCarrito = JSON.parse(localStorage.getItem('listaproductos') || '[]')
    this.calcularMonto()
  }

  eliminarProductoCarrito(producto: any){

    this.listaCarrito.forEach((prod: any,index: any) => {
      if(prod.id_prod === producto.id_prod){
        this.listaCarrito.splice(index,1)
      }
    }); 
    localStorage.setItem('listaproductos', JSON.stringify(this.listaCarrito));

    this.obtenerListaCarrito();
  }

  calcularMonto(){
    
    
    this.montoLocal = []

    this.listaCarrito.forEach((prod: any,index: number) => {
      let seccionMonto = {
        idProducto: 0,
        nombreProducto: "",
        subTotal: 0.00,
        cantidad: 0
      }
      seccionMonto.idProducto = prod.id_prod
      seccionMonto.subTotal = prod.precio_prod*this.cantidad
      seccionMonto.nombreProducto = prod.nombre_prod

      this.montoLocal.push(seccionMonto)

      this.montoTotal = this.montoTotal + seccionMonto.subTotal
      // this.cantidad = cantidadlocal
    });
  }


  pagar(){
    // if(!localStorage.getItem('token')){

    // }else{

    // }
  }

}
