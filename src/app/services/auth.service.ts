import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router) { }

  registrar(cliente: any): Observable<any>{  
    return this.http.post(environment.apiUrl+'/auth/register',cliente)
  }

  iniciarSesion(cliente: any): Observable<any>{
    return this.http.post(environment.apiUrl+'/auth/singin',cliente)
  }

  verificarToken(): boolean{
    if(!localStorage.getItem('token')){
      return false;
    }else{
      return true;
    }
  }

  //obtener token
  getToken(){
    return localStorage.getItem('token');
  }

  //cerrar sesion
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_nombre');
    //remover nombre del usuario
    this.route.navigate(['/login'])
  }

}
