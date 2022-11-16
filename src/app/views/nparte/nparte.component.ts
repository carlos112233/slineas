import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/api/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-nparte',
  templateUrl: './nparte.component.html',
  styleUrls: ['./nparte.component.scss']
})
export class NparteComponent implements OnInit {
  vehiculos: Array<any> = [];
  form: Array<any> = [];
  empList: Array<any> = [];
  verEliminados: boolean = false;
  ver: boolean = false;
  alert = false;
  message: string = '';
  type: string = '';
  submitted = false;
  checkoutForm!: FormGroup;
  checkoutForm2!: FormGroup;
  errorStatus: Boolean = false;
  errorMsg: string = "";
  displayStyle = "none";
  displayStyle2 = "none";
  lison: string = '';
  nparte: string = '';
  proceso: string = '';
  id: string = '';
  submitted2 = false;

  constructor(private service: LoginService, private route: Router, private http: HttpClient, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      nparte: ['', [Validators.required]],
      proceso: ['', [Validators.required]],
      lison: ['', [Validators.required]],
    });
    this.checkoutForm2 = this.formBuilder.group({
      nparte2: ['', [Validators.required]],
      proceso2: ['', [Validators.required]],
      lison2: ['', [Validators.required]],

    });
    if (this.verEliminados == false) {
      this.ontable();
    } else {
      this.onEliminados();
    }
  }


  ontable() {
    this.ver = true;
    this.verEliminados = false;
    this.empList = [];
    this.service.getAreas().subscribe(data => {
      for (let index = 0; index < data.data.areas.length; index++) {
        if (data.data.areas[index].b_activo == "1") {
          this.empList.push(data.data.areas[index]);
        }
      }
    });
  }

  onEliminados() {
    this.verEliminados = true;
    this.empList = [];
    this.service.getAreas().subscribe(data => {
      for (let index = 0; index < data.data.areas.length; index++) {
        if (data.data.areas[index].b_activo == "0") {
          if (data.data.areas[index].s_descripcion != "Historial") {
            this.empList.push(data.data.areas[index]);
          }
        }
      }
    });
  }



  onDelete(id: string, rest:any) {
    this.service.onDeleteArea(id, rest).subscribe(data => {

      if (data.message == "Registro actualizado") {
        this.alert = true;
        this.type = "alert-success";
        this.message = data.message;
        this.closePopup();
      } else {
        this.alert = true;
        this.type = "alert-danger";
        this.message = data.message;
        this.closePopup();

      }
    });
   
  }

  close() {
    this.alert = false;
  }

  onSubmit(form: any) {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }

    this.service.setArea(form).subscribe(data => {

      if (data.message == "El registro se creo satisfactoriamente") {
        this.alert = true;
        this.type = "alert-success";
        this.message = data.message;
        this.closePopup();
      } else {
        this.alert = true;
        this.type = "alert-danger";
        this.message = data.message;
        this.closePopup();

      }
    });
  }
  get f() {
    return this.checkoutForm!.controls;
  }
  get f2() {
    return this.checkoutForm2!.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.checkoutForm.reset();
    this.checkoutForm = this.formBuilder.group({
      nparte: ['', [Validators.required]],
      proceso: ['', [Validators.required]],
      lison: ['', [Validators.required]],
    });
    this.checkoutForm2 = this.formBuilder.group({
      nparte2: ['', [Validators.required]],
      proceso2: ['', [Validators.required]],
      lison2: ['', [Validators.required]],

    });
  }


  openPopup(id: string, nparte: string, lison: string, proceso: string) {
    this.lison = lison;
    this.nparte = nparte;
    this.id = id,
      this.proceso = proceso
    this.displayStyle2 = "block";
  }

  openPopup2(id: string) {
    this.id = id
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.displayStyle2 = "none";
  }
  updateSubmit(forms: any) {
    this.submitted2 = true;
    if (this.checkoutForm2.invalid) {
      return;
    }

    this.service.updateLison(forms, this.id).subscribe(data => {

      if (data.message == "Registro actualizado") {
        this.alert = true;
        this.type = "alert-success";
        this.message = data.message;
        this.closePopup();
      } else {
        this.alert = true;
        this.type = "alert-danger";
        this.message = data.message;
        this.closePopup();

      }
    });
  }

}
