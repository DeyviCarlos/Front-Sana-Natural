import { Component, OnInit } from '@angular/core';
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { CompraService } from 'src/app/services/compra.service';
import { Router } from '@angular/router';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  icondetallecompras = faEye;

  titulo = "Detalle de Compra"

  miscompras:any = [];
  reportPdf: any;
  pdfUrl: any;
  nombrePdf: any;

  constructor(private compraService: CompraService, private router: Router,
    private contadorService:ContadorCarritoService) { }

  ngOnInit(): void {
    this.getMisCompras()
    this.contadorService.actualizarContador()
  }

  getMisCompras(){
    this.compraService.getMisCompras().subscribe(data =>{
    
      console.log(data.mensaje)
      for(let item of data.data){
        if(item.estado_orden == "Pagado"){
          this.miscompras.push(item)
        }
      }
      // this.miscompras = data.data;
    },error => {
        console.log(error);
    })

  }
  detalleCompras(id: any){
      this.compraService.detalleCompra(id).subscribe(data => {
        console.log("data de pd: ",data)
        // const url = URL.createObjectURL(this.blodService.urlBlobLocal+data.ruta);
        // window.open(url, '_blank');
        // URL.revokeObjectURL(url);
  
        this.pdfUrl = data.ruta;
        this.nombrePdf = data.nombre
        const link = document.createElement("a");
        link.href = `${this.pdfUrl}`;
        link.target = "_blank";
        link.id = "enlace-reporte"
        link.rel = "noreferrer noopener"
        document.body.appendChild(link);
        link.click();
        document.getElementById("enlace-reporte")?.remove();
        setTimeout(()=> {
          this.compraService.eliminarPdf(this.nombrePdf).subscribe(res => {
            console.log(res)
          },error => {
            console.log(error)
          })
        },3000);
      },error => {
        console.log(error)
      })  
  }
  

}
