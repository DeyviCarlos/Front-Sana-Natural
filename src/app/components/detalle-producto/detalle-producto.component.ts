import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import { BlobStorageService } from 'src/app/services/blob-storage.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {


  productoForm: FormGroup;

  carritoProductos: any = [];

  stogeUrl:any;

  producto: any = [];
  elemento: any = {
    id_categ: 0,
    id_enfermedad: 0,
    id_prod: 0,
    descrip_categ: '',
    descripcion_enfermedad: '',
    descripcion_prod: '',
    nombre_categoria: '',
    nombre_enfermedad: '',
    nombre_prod: '',
    precio_prod: '',
    stock_prod: 0,
    img_Prod: '',
    img_categ: '',
    img_enfermedad: ''
  }

  detalleElemento: any = {
    id_categ: 0,
    id_enfer_trat: 0,
    id_prod: 0,
    descripcion_prod: '',
    img_Prod: '',
    nombre_prod: '',
    precio_prod: '',
    stock_prod: 0,
    cantidad: 1,
    subTotal: 0.0,
    estado: ''
  }

  constructor(private _route: ActivatedRoute,
    private productoService: ProductoService,
    private contadorService: ContadorCarritoService,
    private blobService: BlobStorageService,
    private fb: FormBuilder) {
      this.productoForm = this.fb.group({
        cantidad: [1,Validators.required],
        
      })
     }

  ngOnInit(): void {
    this.detalleProducto();
    this.contadorService.actualizarContador()
    this.stogeUrl = this.blobService.url;
  }
  detalleProducto(){
    let codigo = this._route.snapshot.paramMap.get('id');

    this.productoService.buscarProductoxId(codigo).subscribe(data =>{
      this.producto = data;
      console.log(this.producto )

      this.elemento=this.producto.data[0]
      console.log("Producto obtenido: ",this.elemento)
      //colocar dominio de las imagenes del back
      this.elemento.img_Prod = this.stogeUrl+this.elemento.img_Prod;
      
    },error => {
      console.log(error);
    })
  }

  agregarCarrito(){
    console.log(this.productoForm.get('cantidad')?.value);

    // this.detalleElemento =  this.elemento;
    this.detalleElemento = {
      id_categ: this.elemento.id_categ,
      id_enfer_trat: this.elemento.id_enfermedad,
      id_prod: this.elemento.id_prod,
      descripcion_prod: this.elemento.descripcion_prod,
      img_Prod: this.elemento.img_Prod,
      nombre_prod: this.elemento.nombre_prod,
      precio_prod: this.elemento.precio_prod,
      stock_prod: this.elemento.stock_prod,
      cantidad: 1,
      subTotal: 0.0,
      estado_prod: this.elemento.estado_prod
    }

    console.log("Elemento Detalle:",this.detalleElemento)

    this.detalleElemento.cantidad = this.productoForm.get('cantidad')?.value;
    this.detalleElemento.subTotal = this.detalleElemento.cantidad*parseFloat(this.elemento.precio_prod)

    this.carritoProductos = JSON.parse(localStorage.getItem('listaproductos') || '[]') 
    
    console.log("Carrito de compras: ",this.carritoProductos)
    let cambio = false;
    for(let item of this.carritoProductos){
      if(item.id_prod == this.detalleElemento.id_prod){
        item.cantidad = this.detalleElemento.cantidad
        item.subTotal = this.detalleElemento.subTotal
        cambio=true
      }
    }

    if(!cambio){

      this.carritoProductos.push(this.detalleElemento)
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: "Click en el botón para salir!",
        showConfirmButton: true,
        confirmButtonText: 'listo',
        customClass: {
          confirmButton: 'confirm-button'
        }
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Cantidad del producto fue actualizada',
        text: "Click en el botón para salir!",
        showConfirmButton: true,
        confirmButtonText: 'listo',
        customClass: {
          confirmButton: 'confirm-button'
        }
      })
    }
    localStorage.setItem('listaproductos',JSON.stringify(this.carritoProductos)) 
    this.contadorService.actualizarContador();

    
  }

}
