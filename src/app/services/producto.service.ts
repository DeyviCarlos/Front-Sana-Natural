import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  buscarProductoxNombre(): Observable<any>{
    return this.http.get(environment.apiUrl+'/enfermedades')
  }
  buscarProductoxCategoria(): Observable<any>{
    return this.http.get(environment.apiUrl+'/enfermedades')
  }
  buscarProductoxEnfermedad(): Observable<any>{
    return this.http.get(environment.apiUrl+'/enfermedades')
  }
  getListarProductos(): Observable<any>{
    return this.http.get(environment.apiUrl+'/productos')
  }

}
