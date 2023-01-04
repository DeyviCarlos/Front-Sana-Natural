import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {


  productoForm: FormGroup;

  carritoProductos: any = [];

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
    cantidad: 1
  }

  constructor(private _route: ActivatedRoute,
    private productoService: ProductoService,
    private fb: FormBuilder) {
      this.productoForm = this.fb.group({
        cantidad: ['',Validators.required],
        
      })
     }

  ngOnInit(): void {
    this.detalleProducto();
  }
  detalleProducto(){
    let codigo = this._route.snapshot.paramMap.get('id');

    this.productoService.buscarProductoxId(codigo).subscribe(data =>{
      this.producto = data;
      this.elemento=this.producto.data[0]
      console.log(this.elemento)
    },error => {
      console.log(error);
    })
  }

  agregarCarrito(elemento: any){
    console.log(this.productoForm.get('cantidad')?.value);

    this.detalleElemento =  this.elemento;
    this.detalleElemento.cantidad = this.productoForm.get('cantidad')?.value;

    this.carritoProductos = JSON.parse(localStorage.getItem('listaproductos') || '[]') 
    
    if (this.carritoProductos.filter((x: any) => x.id_prod === elemento.id_prod)) {
     
      
    } else {
      

    }
  }


}
