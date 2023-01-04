import { Component, OnInit } from '@angular/core';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  carrito = faShoppingCart;

  listaProductos: any;

  listaImg: any = [
    "../assets/resource/img/aceite2.png",
    "../assets/resource/img/prostazan.png",
    "../assets/resource/img/osteoporosis.png"
  ];
  data_productos = [
    {
      codigo: "1",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "100",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/aceite2.png",
      estado: "Activo"
    },
    {
      codigo: "2",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "200",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/aceite1.png",
      estado: "Activo"
    },
    {
      codigo: "3",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/prostazan.png",
      estado: "Activo"
    },
    {
      codigo: "4",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/osteoporosis.png",
      estado: "Activo"
    },
    {
      codigo: "5",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/aceite4.png",
      estado: "Activo"
    },
    {
      codigo: "6",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/aceite3.png",
      estado: "Activo"
    },
    {
      codigo: "7",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/aceite3.png",
      estado: "Activo"
    },
    {
      codigo: "8",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/prostazan.png",
      estado: "Activo"
    },
    {
      codigo: "9",
      nombre: "Aceite",
      descripcion: "Aceite de ajonjolí de 250 ml",
      stock: "300",
      precio: "35",
      categoria: "Aceites Naturales",
      img: "../assets/resource/img/aceite4.png",
      estado: "Activo"
    },
  ]

  listaCategorias: any = [];
  data_categorias = [
    {
      codigo: "1",
      nombre: "Bebidas",
      descripcion: "Aceites hechos a base de la sabila de diversas plantas",
      estado: "Activo"
    },
    {
      codigo: "2",
      nombre: "Aceites Naturales",
      descripcion: "Bebidas hechos con ingredientes naturales",
      estado: "Activo"
    },
    {
      codigo: "3",
      nombre: "Naturales",
      descripcion: "Plantas llegadas desde las distintas regiones del Perú",
      estado: "Activo"
    }
  ]

  listaEnfermedades: any = [];
  data_enfermedades = [
    {
      codigo: "1",
      nombre: "Gastritis",
      descripcion: "Consiste en la inflamación del revestimiento del estomago",
      estado: "Activo"
    },
    {
      codigo: "2",
      nombre: "Reumatismo",
      descripcion: "Enfermedades que afectan a las articulaciones y producen hinchazón",
      estado: "Activo"
    },
    {
      codigo: "3",
      nombre: "Higado Graso",
      descripcion: "Afección en la que se acumula grasa en el hígado",
      estado: "Activo"
    }
  ]

  carritoProductos: any = [];

  constructor(private categoriaSevice: CategoriaService,
    private enferemedadService: EnfermedadService,
    private productoService: ProductoService) { }


  ngOnInit(): void {
    this.listarCategorias();
    this.listarEnfermedad();
    this.listarProductos();
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
    }, error => {
      console.log(error)
    })
  }

  agregarCarrito(detproducto: any){
    this.carritoProductos = JSON.parse(localStorage.getItem('listaproductos') || '[]')


    if (this.carritoProductos.filter((elemento: any) => elemento.id_prod === detproducto.id_prod)[0]) {
      console.log("Producto ya está en el carrito")
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
    }


    
  }
  buscarProductoxCategoria(categoria: any){
    this.productoService.buscarProductoxCategoria(categoria.id_categoria).subscribe(data =>{
      this.listaProductos = data.data;
    },error => {
      console.log(error);
    })

  }
  buscarProductoxEnfermedad(enfermedad: any){
    this.productoService.buscarProductoxEnfermedad(enfermedad.id_enfermedad).subscribe(data =>{
      this.listaProductos = data.data;
    },error => {
      console.log(error);
    })

  }

}
