import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/api/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  empList: Array<any> = [];
  errorStatus: Boolean = false;
  errorMsg: string = "";
  form!: FormGroup;
  submitted = false;
  fileName= 'Reporte.xlsx';

  constructor(private service: LoginService, private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.onTable();
    this.form = this.formBuilder.group({
      area: [''],
      lison: [''],
      economico:[''],
      usuario:[''],
      n_empleado:[''],
      inicio:[''],
      fin:[''],
    });
  }

  get f() {
    return this.form!.controls;
  }

  onTable() {
    this.onReset();
    while(this.empList.length){
      this.empList.pop()
    }
    this.service.getItems().subscribe(data => {
      for (let index = 0; index < data.data.procesos.length; index++) {
        this.empList.push(data.data.procesos[index]);
      }    
    });
  }
  
  onExcel(){
     /* pass here the table id */
     let element = document.getElementById('excel-table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     /* save to file */  
     XLSX.writeFile(wb, this.fileName);
  }

  buscar(){
    this.submitted = true;
    this.empList=[];
    if (this.form!.value) {     
      this.service.getFilter(this.form!.value).subscribe(data => {
        for (let index = 0; index < data.data.procesos.length; index++) {
          this.empList.push(data.data.procesos[index]);
        }    
      });
      
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form = this.formBuilder.group({
      area: [''],
      lison: [''],
      economico:[''],
      usuario:[''],
      n_empleado:[''],
      inicio:[''],
      fin:[''],
    });
  }
}
