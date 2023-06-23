import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSesionGuard implements CanActivate {
  
  constructor(private authService: AuthService,
    private router: Router){

  }
  canActivate():boolean {
    if(this.authService.verificarToken()){
      this.router.navigate(['/productos'])
      return false;
    }
    return true;
  }
  
}
