import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

const routes: Routes = [
  {path: 'registrar', component: RegistrarComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: MainLayoutComponent, children: [
    {path: 'inicio', component: InicioComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'contactanos', component: ContactanosComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'mis-compras', component: MisComprasComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'comprar', component: ComprarComponent}
  ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
  //login-sistema
  
  //dashboard
  //dashboard/ventas
  //dashboard/home
  //dashboard/usuarios
  //dasboard/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
