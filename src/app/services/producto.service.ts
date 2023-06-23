import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  buscarProductoxNombre(cadena: any): Observable<any>{
    return this.http.get(environment.apiUrl+'/productos/nombre/'+cadena )
  }
  buscarProductoxCategoria(idCategoria: any): Observable<any>{
    return this.http.get(environment.apiUrl+'/productos/categoria/'+`${idCategoria}`)
  }
  buscarProductoxEnfermedad(idEnfermedad: any): Observable<any>{
    return this.http.get(environment.apiUrl+'/productos/enfermedad/'+`${idEnfermedad}`)
  }
  getListarProductos(): Observable<any>{
    return this.http.get(environment.apiUrl+'/productos')
  }
  buscarProductoxId(id: any){
    return this.http.get(environment.apiUrl+'/productos/'+id)
  }

}
