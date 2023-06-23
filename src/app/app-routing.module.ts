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
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { AuthGuard } from './auth.guard';
import { AuthSesionGuard } from './auth-sesion.guard';

const routes: Routes = [
  {path: 'registrar', component: RegistrarComponent,canActivate: [AuthSesionGuard]},
  {path: 'login', component: LoginComponent,canActivate: [AuthSesionGuard]},
  {path: '',component: MainLayoutComponent, children: [
    {path: 'inicio', component: InicioComponent},
    {path: 'nosotros', component: NosotrosComponent,canActivate: [AuthSesionGuard]},
    {path: 'contactanos', component: ContactanosComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'mis-compras', component: MisComprasComponent,canActivate:[AuthGuard] },
    {path: 'carrito', component: CarritoComponent},
    {path: 'comprar', component: ComprarComponent,canActivate:[AuthGuard]},
    {path: 'detalle-producto/:id',component: DetalleProductoComponent}

  ]},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
