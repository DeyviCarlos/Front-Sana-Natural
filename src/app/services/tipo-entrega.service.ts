import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoEntregaService {

  constructor(private http: HttpClient) { }

  getTipoEntrega(): Observable<any>{
    return this.http.get(environment.apiUrl+'/tipo-entrega')
  }
}
