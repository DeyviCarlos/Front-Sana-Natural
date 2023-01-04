import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ComprarComponent } from './components/comprar/comprar.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    NosotrosComponent,
    InicioComponent,
    ContactanosComponent,
    ProductosComponent,
    RegistrarComponent,
    MisComprasComponent,
    CarritoComponent,
    MainLayoutComponent,
    FooterComponent,
    CarouselComponent,
    ComprarComponent,
    DetalleProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
