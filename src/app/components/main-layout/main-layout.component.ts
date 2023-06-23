import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {

  //comunicacion de padre a hijo
  //contador del carrito --- Componente padre
  // contadorCarrito = 0 ;

  //ejemplo de comunicacion de hijo a padre
  // items = ['item1','item2','item3'] 

  constructor() { }

  ngOnInit(): void {
  }


  // addItem(newItem: string){
  //   this.items.push(newItem);
  // }

}
