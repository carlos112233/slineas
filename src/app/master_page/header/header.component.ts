import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dashbord: string = '';
  reportes: string = 'reportes';
  qrgenerador: string = 'qrgenerador';
  nparte: string = 'nparte';
  correo: string = 'correo';
  constructor(private ruta: Router) { }

  ngOnInit(): void {
    this.checkToken();
  }
  onSubmit() {
    localStorage.removeItem('token');
    this.ruta.navigate(['login']);
  }

  checkToken() {
    var date = Number(localStorage.getItem('date'));
    var today = new Date();
    var day = today.setDate(today.getDate());
    if (date <= day) {
      localStorage.clear();
      this.ruta.navigate(['login'])
    } else {
      //saber el tiempo de en que expira el token
      // var rest = new Date(date);
      // const format = 'dd/MM/yyyy H:mm:ss';
      // const locale = 'en-US';
      // const formattedDate = formatDate(rest, format, locale);
      // console.log("tu sessión expira: " + formattedDate);
    }
  }

}
