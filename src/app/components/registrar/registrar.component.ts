import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {faEnvelope,faLock,faUser} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  formCliente: FormGroup;
  
  //iconos
  iconCorreo = faEnvelope;
  iconContrasenia = faLock;
  iconUsuario = faUser;

  public helper:JwtHelperService  = new JwtHelperService ();


  constructor(private fb: FormBuilder,private authService: AuthService,
    private router: Router) { 
    this.formCliente = this.fb.group({
      nombre: ['',[Validators.required, Validators.maxLength(80),Validators.minLength(3),
              Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)]],
      correo: ['',[Validators.required,Validators.email]],
      contrasenia: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(100)]]
    });
  }
  get nombre(){
    return this.formCliente.get('nombre');
  }
  get correo(){
    return this.formCliente.get('correo');
  }
  get contrasenia(){
    return this.formCliente.get('contrasenia');
  }
  ngOnInit(): void {
  }


  registrarUsuario(){

    let nombre = this.formCliente.get('nombre')?.value;
    let correo = this.formCliente.get('correo')?.value;
    let contrasenia = this.formCliente.get('contrasenia')?.value;

    let cliente = {
      nombre: nombre,
      correo: correo,
      contrasenia: contrasenia
    }


    if(this.formCliente.valid){
      this.authService.registrar(cliente).subscribe(data => {

        console.log(data)
        
        //redireccionar a la página producto
        localStorage.setItem('token',data.jwtToken);
  
        let token = localStorage.getItem('token') || '';
        
        //decodificando el token
        let decoded = this.helper.decodeToken(token)
  
        //decodificar el token y almacenar el nombre del usuario
        localStorage.setItem('usuario_nombre',decoded.nombre)
        
        this.router.navigate(['/productos']);
  
      }, error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'No se pudo registrar...',
          text: `${error.error.mensaje}`,
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
