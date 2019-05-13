import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    private loginService: LoginService,
    private socket: Socket,
    private router: Router
  ) {
    if (this.loginService.getUsuario('users')) {
      this.router.navigate(['/init']);
    }
    this.usuario = new Usuario();
  }

  ngOnInit() {
    // this.socket.emit('login', {coneccion: 'login'});
    // this.conectarScoket();
  }
  validarLogin() {
    if (this.usuario.usuario && this.usuario.clave) {
      this.loginService.validarLogin(this.usuario).subscribe(result => {
      console.log('result is ', result);
      if (result['status'] === 'success') {
        console.log(result['data']);
        if (result['data'].rolId === 1) {
          localStorage.setItem('usuario', JSON.stringify(result['data']));
          this.router.navigate(['/init']);
        } else if (result['data'].rolId === 2) {
          localStorage.setItem('usuario', JSON.stringify(result['data']));
          this.router.navigate(['/cocina']);
        }
      } else {
        alert('Wrong username - password');
      }
    }, error => {
      console.log('error is ', error);
    });
    } else {
      alert('Ingresar usuario y contraseña');
    }
  }

  conectarScoket() {
    this.socket.on('login', (data: any) => {
      console.log(data);
    });
  }

}
