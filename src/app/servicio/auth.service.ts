import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay } from 'rxjs';
import { UsuarioLogeado } from '../modelos/UsuarioLogeado';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //observador del cargando
  private cargando: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //observador publico
  public $cargando = this.cargando.asObservable();
  //observador del usuarioLogeado
  private usuarioActivo: BehaviorSubject<UsuarioLogeado | null> =
  new BehaviorSubject<UsuarioLogeado | null>(null);
  //observador publico
  public $usuarioActivo = this.usuarioActivo.asObservable();
  private readonly URL_LOGIN = "https://dummyjson.com/auth/login";//Ruta para Inicio de Sesión.

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    
  }

  public intentarLogear(usuario: string, password: string){
    this.cargando.next(true);
    this.http.post<UsuarioLogeado>(this.URL_LOGIN, //->Metodo de acceso
      JSON.stringify({
      username: usuario,
      password
    }), {
      headers:{
        "Content-Type":"application/json"
      }
    }
    )
    .pipe(delay(2000))
    .subscribe( resultado => {
      this.usuarioActivo.next(resultado);
      this.cargando.next(false);
      this.router.navigate(['menu'])//navega a la carpeta menu
    });

  }
}
