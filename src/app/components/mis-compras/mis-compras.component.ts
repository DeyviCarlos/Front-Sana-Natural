import { Component, OnInit } from '@angular/core';
import {faEye} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  detallecompras = faEye;

  titulo = "Detalle de Compra"

  data_compras = [
    {
      codigo: "6615119615as",
      fecha: "28/11/2022",
      tipo: "Delivery",
      estado: "En proceso",
      monto_total: "162"
    },
    {
      codigo: "668711ff15as",
      fecha: "29/11/2022",
      tipo: "Delivery",
      estado: "En proceso",
      monto_total: "26"
    },
    {
      codigo: "661611ff15as",
      fecha: "30/11/2022",
      tipo: "En tienda",
      estado: "Finalizado",
      monto_total: "235"
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
