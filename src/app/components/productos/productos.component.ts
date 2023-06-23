import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {faShoppingCart,faSearch } from '@fortawesome/free-solid-svg-icons';
import { BlobStorageService } from 'src/app/services/blob-storage.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { ProductoService } from 'src/app/services/producto.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //icono
  carrito = faShoppingCart;
  iconBuscar = faSearch;

  //Contador del componente hijo
  // @Output() newItemEvent = new EventEmitter<string>();
  // contadorhijo2 = 0;

  stogeUrl: any;
  listaProductos: any;
  buscar = "";
  formBuscar: FormGroup;
  // formEnfermedades: FormGroup;

  listaCategorias: any = [];
  listaEnfermedades: any = [];

  carritoProductos: any = [];

  constructor(private categoriaSevice: CategoriaService,
    private enferemedadService: EnfermedadService,
    private productoService: ProductoService,
    private contadorService: ContadorCarritoService,
    private blobStorage: BlobStorageService,
    private fb:FormBuilder) {
      this.formBuscar = this.fb.group({
        cadena: ['']
    }); 
    // this.formEnfermedades = this.fb.group({
    //   nombre: ''
    // });
  }


  ngOnInit(): void {
    this.listarCategorias();
    this.listarEnfermedad();
    this.listarProductos();
    this.contadorService.actualizarContador();
    this.stogeUrl = this.blobStorage.url
  }

  listarEnfermedad(){
    this.enferemedadService.getEnfermedades().subscribe(data =>{
      this.listaEnfermedades = data.data;
      console.log(this.listaEnfermedades)
    },error => {
      console.log(error);
    })
  }
  listarCategorias(){
    this.categoriaSevice.getCategoria().subscribe(data => {
      this.listaCategorias = data.data;
      console.log(this.listaCategorias)
    }, error => {
      console.log(error)
    })
  }
  listarProductos(){
 
    this.productoService.getListarProductos().subscribe(data => {
      this.listaProductos = data.data;
      console.log(this.listaProductos)
      
      for(let item of this.listaProductos){
        item.img_Prod = this.stogeUrl+item.img_Prod;
      }
    }, error => {
      console.log(error)
    })
  }

  agregarCarrito(detproducto: any){
    this.carritoProductos = JSON.parse(localStorage.getItem('listaproductos') || '[]')


    if (this.carritoProductos.filter((elemento: any) => elemento.id_prod === detproducto.id_prod)[0]) {
      console.log("Producto ya está en el carrito")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El producto ya está agregado al carrito',
        customClass: {
          confirmButton: 'cancel-button'
        }
      })
    } else {
      let detalleProducto = {
        descripcion_prod: detproducto.descripcion_prod,
        estado_prod: detproducto.estado_prod,
        id_categ: detproducto.id_categ,
        id_enfer_trat: detproducto.id_enfer_trat,
        id_prod: detproducto.id_prod,
        img_Prod: detproducto.img_Prod,
        nombre_prod: detproducto.nombre_prod,
        precio_prod: detproducto.precio_prod,
        stock_prod: detproducto.stock_prod,
        cantidad: 1,
        subTotal: 0.00
      }

      this.carritoProductos.push(detalleProducto)
      localStorage.setItem('listaproductos',JSON.stringify(this.carritoProductos))

      //actualizamos el contador
      this.contadorService.actualizarContador();
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado al carrito',
        text: "Click en el botón para salir!",
        showConfirmButton: true,
        confirmButtonText: 'listo',
        customClass: {
          confirmButton: 'confirm-button'
        }
      })
    }


    
  }
  buscarProductoxCategoria(categoria: any){
    this.productoService.buscarProductoxCategoria(categoria.id_categoria).subscribe(data =>{
      this.listaProductos = data.data;

      for(let item of this.listaProductos){
        item.img_Prod = this.stogeUrl+item.img_Prod;
      }
    },error => {
      console.log(error);
    })

  }
  buscarProductoxEnfermedad(enfermedad: any){
    this.productoService.buscarProductoxEnfermedad(enfermedad.id_enfermedad).subscribe(data =>{
      this.listaProductos = data.data;
      for(let item of this.listaProductos){
        item.img_Prod = this.stogeUrl+item.img_Prod;
      }
    },error => {
      console.log(error);
    })

  }

  buscarProductosNombre(){
    this.buscar = this.formBuscar.get('cadena')?.value
    console.log("cadena a buscar: ",this.buscar)

    if(!this.buscar){
      console.log("cadena vacia")
    }else{
      this.productoService.buscarProductoxNombre(this.buscar).subscribe(data => {
        this.listaProductos = data.data
  
        for(let item of this.listaProductos){
          item.img_Prod = this.stogeUrl+item.img_Prod;
        }
      },error =>{
        console.log(error)
      })
    }
  }
  // onChange() {
  //   // const cartoons = (this.form.controls.name as FormArray);

  // //   if (isChecked) {
  // //     // cartoons.push(new FormControl(name));
  // //   } else {
  // //     // const index = cartoons.controls.findIndex(x => x.value === name);
  // //     // cartoons.removeAt(index);
  // //   }
  // // }


  // // addNewItem(value: string) {
  // //   this.newItemEvent.emit(value);
  // }


}
