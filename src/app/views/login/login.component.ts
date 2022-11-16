import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginI } from 'src/app/models/login.interface';
import { LoginService } from 'src/app/services/api/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  errorStatus: Boolean = false;
  errorMsg: string = "";

  constructor(private login: LoginService, private formBuilder: FormBuilder, private ruta: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.checkToken();
  }
  get f() {
    return this.form!.controls;
  }
  onSubmit(form: LoginI) {
    this.submitted = true;
    if (this.form!.valid) {
      this.login.onLogin(form).subscribe(data => {
        if (data.type == "success") {
          localStorage.setItem('usuario', data.data.usuario.nombres);
          this.login.onLoginL(form).subscribe(data => {
            if (data.status == "success") {
              localStorage.setItem('token', data.data.token);
              var today = new Date();
              var addDay = today.setDate(today.getDate() + 1 );
              var resta = addDay-14400000;
              localStorage.setItem('date', resta.toString());
              this.ruta.navigate(['dashbord'])
            }
          });
        } else {
          this.errorStatus = true;
          this.errorMsg = data.message;
        }
      }, () => {
        this.errorStatus = true;
        this.errorMsg = "Error en usuario o contraseña"
      });
    }
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      this.ruta.navigate(['dashbord'])
    }
  }
}
