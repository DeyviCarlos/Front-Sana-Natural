import { Component, OnInit } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  eliminar = faTrash;
  
  listaCarrito: any = [];
  estadoBtnCompra:boolean = false;


  DetalleCompra = {
    idCompra: 0,
    montoTotal: 0.00,
    fecha: "00/00/0000",
    hora: "00:00:00",
    idCliente: 0,
    tipoEntrega: "",
    direccion: "",
    telefono: "",
    detalleCompraProducto: []
  };

  montoTotal: any;
  // montoLocal: any = [];

  constructor(private contadorService: ContadorCarritoService) {
    this.montoTotal = 0.00
   }

  ngOnInit(): void {
    this.obtenerListaCarrito()
    this.calcularMonto()
  }

  obtenerListaCarrito(){
    // this.montoTotal = 0.00
    this.listaCarrito = JSON.parse(localStorage.getItem('listaproductos') || '[]')
    if(this.listaCarrito.length != 0){
      this.estadoBtnCompra = true;
    }else{
      this.estadoBtnCompra = false;
    }
  }

  eliminarProductoCarrito(producto: any){

    this.listaCarrito.forEach((prod: any,index: any) => {
      if(prod.id_prod === producto.id_prod){
        this.listaCarrito.splice(index,1)
      }
    }); 
    localStorage.setItem('listaproductos', JSON.stringify(this.listaCarrito));
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El producto fue eliminado del carrito',
      customClass: {
        confirmButton: 'cancel-button'
      }
    })

    this.obtenerListaCarrito();
    this.calcularMonto();
  }

  calcularMonto(){
    this.montoTotal = 0.00
    this.listaCarrito.forEach((prod: any) => {
      console.log(prod.precio_prod)
      console.log(prod.cantidad)
      prod.subTotal = prod.precio_prod*prod.cantidad
      console.log( prod.subTotal)
      // this.montoLocal.push(seccionMonto)

      this.montoTotal = this.montoTotal + prod.subTotal
      // this.cantidad = cantidadlocal
    });
    localStorage.setItem('listaproductos', JSON.stringify(this.listaCarrito));
    this.contadorService.actualizarContador();
  }

}
