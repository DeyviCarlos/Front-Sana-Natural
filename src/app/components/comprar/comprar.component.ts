import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompraService } from 'src/app/services/compra.service';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import { TipoEntregaService } from 'src/app/services/tipo-entrega.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

  formCliente: FormGroup;
  tipos: any = [];
  listaCarrito: any = [];
  
  constructor( private fb: FormBuilder, private tipoEntregaServicio: TipoEntregaService,
    private contadorService:ContadorCarritoService,
    private compraServicio: CompraService) { 
    this.formCliente = this.fb.group({
      direccion: ['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(150)]],
      telefono: ['',[Validators.required,Validators.minLength(9),
      Validators.maxLength(9),Validators.pattern(/^[9](\d){8}$/)]],
      fecha: [null,Validators.required],
      tipoEntrega: ['',Validators.required]
    });
  }
  get direccion(){
    return this.formCliente.get('direccion');
  }
  get telefono(){
    return this.formCliente.get('telefono');
  }
  get fecha(){
    return this.formCliente.get('fecha');
  }
  get tipoEntrega(){
    return this.formCliente.get('tipoEntrega');
  }

  ngOnInit(): void {
    this.listarTipoEntrega()
    this.contadorService.actualizarContador()

  }
  listarTipoEntrega(){
    this.tipoEntregaServicio.getTipoEntrega().subscribe(data =>{  
      
      // localStorage.setItem('token',data.jwtToken);
      // this.router.navigate(['/tienda/perfil']);
      this.tipos = data.data
      console.log(this.tipos)
    }, error =>{
      console.log(error);
    })
  }

  comparProductos(){
    let direccion = this.formCliente.get('direccion')?.value;
    let telefono = this.formCliente.get('telefono')?.value;
    let fecha = this.formCliente.get('fecha')?.value;
    let tipoEntrega = this.formCliente.get('tipoEntrega')?.value;
    let idEntrega = 0;

    this.listaCarrito = JSON.parse(localStorage.getItem('listaproductos') || '[]') 

    console.log(this.listaCarrito)

    this.tipos.forEach((tipo:any) => {
      if(tipoEntrega == tipo.nombre_entrega){
        idEntrega = tipo.id_entrega;
      }
    });
    
    //obtener el id de la orden
    //

    let orden = {
      items: this.listaCarrito,
      direccion: direccion,
      telefono: telefono,
      fecha: fecha,
      idEntrega: idEntrega
    }
    if (this.formCliente.valid){
      this.compraServicio.getCompra(orden).subscribe(data =>{  
        console.log(data);
        window.location.href = data.data.body.init_point;
        
      }, error =>{
        console.log(error);
      })
  
      localStorage.removeItem('listaproductos')
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay campos que no cumplen las condiciones',
        customClass: {
          confirmButton: 'cancel-button'
        }
      })
    }
    


  }

}
