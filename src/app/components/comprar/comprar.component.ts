import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEntregaService } from 'src/app/services/tipo-entrega.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

  formCliente: FormGroup;
  tipos: any = [];
  constructor( private fb: FormBuilder, private tipoEmntregaServicio: TipoEntregaService) { 
    this.formCliente = this.fb.group({
      direccion: '',
      telefono: '',
      fecha: null,
      tipoEntrega: '',
      numerotarjeta: '',
      tipotajeta: '',
      anio: '',
      mes: '',
      cvv: '',
      dni: ''
    });
  }

  ngOnInit(): void {
    this.listarTipoEntrega()
  }
  listarTipoEntrega(){
    this.tipoEmntregaServicio.getTipoEntrega().subscribe(data =>{  
      
      // localStorage.setItem('token',data.jwtToken);
      // this.router.navigate(['/tienda/perfil']);
      this.tipos = data.data
    }, error =>{
      console.log(error);
    })
  }

  comparProductos(){
    let direccion = this.formCliente.get('direccion')?.value;
    let telefono = this.formCliente.get('telefono')?.value;
    let fecha = this.formCliente.get('telefono')?.value;

    // this.tipoEmntregaServicio.getTipoEntrega(email,password).subscribe(data =>{  
    //   console.log(data);
    // }, error =>{
    //   console.log(error);
    // })
  }

}
