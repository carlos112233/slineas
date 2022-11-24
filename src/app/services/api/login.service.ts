import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Busqueda } from 'src/app/models/buqueda.interface';
import { Areas } from 'src/app/models/areas.interface';
import { HttpClient } from '@angular/common/http';
import { LoginI } from 'src/app/models/login.interface';
import { LoginLi } from 'src/app/models/loginL.interface';
import { ResponseI } from 'src/app/models/respose.interface';
import { Message } from 'src/app/models/message.interface';
import { Lisons } from 'src/app/models/lison.interface';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  url: string = "https://servimsa.net/";
  url2: string = "http://servimsa.net:8005/";
  licencia: string = "";

  constructor(private http: HttpClient) { }

  getItems(): Observable<Busqueda> {
    let direct = this.url2 + "api/proceso/busqueda";
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }
    const body = JSON.stringify({
      "s_orden": "DESC",
      "s_top": "1"
    });
    return this.http.post<Busqueda>(direct, body, { 'headers': headers });
  }

  onLogin(form: LoginI): Observable<ResponseI> {
    let direct = this.url + "intranet/api/ws.login.app?codigo=" + form.usuario + "&password=" + form.password;

    return this.http.post<ResponseI>(direct, form);
  }
  onLoginL(form: LoginI): Observable<LoginLi> {
    let direct2 = this.url2 + "api/login";
    const headers = {
      "Content-Type": "application/json",
      'Licencia': 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4'
    }
    const body = JSON.stringify({
      "user": "" + form.usuario,
      "password": "segurito"
    });

    return this.http.post<LoginLi>(direct2, body, { 'headers': headers })
  }

  getFilter(data: Array<any>): Observable<Busqueda> {
    let direct = this.url2 + "api/proceso/busqueda";
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }
    const body = JSON.stringify({

      "id_area": data['area'],
      "id_lison": data['lison'],
      "s_economico": data['economico'].toString(),
      "s_usuario": data['usuario'].toString(),
      "n_empleado": data['n_empleado'],
      "inicio": data['inicio'],
      "fin": data['fin']
    });
    return this.http.post<Busqueda>(direct, body, { 'headers': headers });
  }

  getAreas(): Observable<Areas> {
    let direct = this.url2 + "api/areas";
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }
    const body = JSON.stringify({
      "s_orden": "DESC",
      "s_top": "1"
    });
    return this.http.get<Areas>(direct, { 'headers': headers });
  }

  updateLison(data: any, id:any): Observable<Message> {
    let direct = this.url2 + "api/areas/"+id;
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }

    const body = JSON.stringify({
      "s_descripcion": data.proceso2,
      "n_parte": data.nparte2, 
      "id_lison":data.lison2,
      "b_activo":"1"
    });
    return this.http.put<Message>(direct, body, { 'headers': headers });
  }

  onDeleteArea(id:any, reset:string):Observable<Message>{
    let direct = this.url2 + "api/areas/"+id;
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }

    const body = JSON.stringify({
      "b_activo":reset.toString()
    });
    return this.http.put<Message>(direct, body, { 'headers': headers });
  }
  setArea(data: any):Observable<Message>{
    let direct = this.url2 + "api/areas";
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }

    const body = JSON.stringify({
      "s_descripcion": data.proceso,
      "n_parte": data.nparte, 
      "id_lison":data.lison,
      "b_activo":"1"
    });
    return this.http.post<Message>(direct, body, { 'headers': headers });
  }

  getLison(): Observable<Lisons> {
    let direct = this.url2 + "api/lison";
    var dato = localStorage.getItem('token');
    const headers = {
      "Content-Type": "application/json",
      "Licencia": 'Iyp4wP19rX4LN51i75UtBmi9rnE3tzCJ183a862T2yFZW5MDegcbAwhGqxdQDHlKSo97vkqfO3oRYJFMVu68eSQ0j27G6AsKLPH4',
      "Token": "" + dato
    }
    const body = JSON.stringify({
      "s_orden": "DESC",
      "s_top": "1"
    });
    return this.http.get<Lisons>(direct, { 'headers': headers });
  }
}
