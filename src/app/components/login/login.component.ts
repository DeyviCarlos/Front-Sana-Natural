import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {faEnvelope,faLock,faUser} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public helper:JwtHelperService  = new JwtHelperService ();

  formCliente: FormGroup;
  
  //iconos
  iconCorreo = faEnvelope;
  iconContrasenia = faLock;

  constructor(private fb: FormBuilder,private authService: AuthService,
    private router:Router) { 
    this.formCliente = this.fb.group({
      correo: ['',[Validators.required,Validators.email]],
      contrasenia: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(100)]]
    });
    
  }

  ngOnInit(): void {
  }
  get correo(){
    return this.formCliente.get('correo');
  }
  get contrasenia(){
    return this.formCliente.get('contrasenia');
  }

  iniciarSesion(){
    let correo = this.formCliente.get('correo')?.value;
    let contrasenia = this.formCliente.get('contrasenia')?.value;

    let cliente = {
      correo: correo,
      contrasenia: contrasenia
    }

    if(this.formCliente.valid){
      this.authService.iniciarSesion(cliente).subscribe(data => {

        console.log(data)
        
        //almacenar el token del backend en el Storage
        localStorage.setItem('token',data.jwtToken);
  
        let token = localStorage.getItem('token') || '';
        
        //decodificando el token
        let decoded = this.helper.decodeToken(token)
  
        //decodificar el token y almacenar el nombre del usuario
        localStorage.setItem('usuario_nombre',decoded.nombre)
  
        //redireccionar a la página producto
        this.router.navigate(['/productos']);
  
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:  `${error.error}`,
          customClass: {
            confirmButton: 'cancel-button'
          }
        })
        this.formCliente.reset();
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay campos que no cumplen las condiciones',
        customClass: {
          confirmButton: 'cancel-button'
        }
      })
    }
  }

}
