import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  getCompra(orden: any): Observable<any>{
    return this.http.post(environment.apiUrl+'/pasarela/createorden',orden)
  }
  getMisCompras(): Observable<any>{
    return this.http.get(environment.apiUrl+'/ventas/miscompras')
  }
  detalleCompra(id: any): Observable<any>{
    return this.http.get(environment.apiUrl+'/ventas/reporte/'+`${id}`)
  }
  eliminarPdf(nombrePdf: any):Observable<any>{
    return this.http.get(environment.apiUrl+'/ventas/deletepdf/'+`${nombrePdf}`)
  }
  // detalleCompra(id: any): Promise<Blob>{
  //   return this.http
  //   .get(environment.apiUrl+'/ventas/reporte/'+`${id}`, {
  //     responseType: 'blob',
  //   })
  //   .toPromise()
  //   .then((response) => response as Blob);

  // }
  // getPdf(): Promise<Blob> {
  //   const url = 'http://localhost:3000/api/pdf';
  //   return this.http
  //     .get(url, {
  //       responseType: 'blob',
  //     })
  //     .toPromise()
  //     .then((response) => response as Blob);
  // }
}
