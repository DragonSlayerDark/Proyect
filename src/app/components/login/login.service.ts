import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  validarLogin(usuario: Usuario) {
    return this.http.post('http://localhost:3003/api/user/login', {
      usuario: usuario.usuario,
      clave: usuario.clave
    });
  }

  getUsuario(usuario: string) {
    // localStorage.clear();
    if (localStorage.getItem(usuario) === undefined || localStorage.getItem(usuario) == null || localStorage.getItem(usuario) === '') {
      return false;
    } else {
      return true;
    }
  }
}
