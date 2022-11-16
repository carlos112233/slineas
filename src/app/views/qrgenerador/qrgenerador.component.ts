import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-qrgenerador',
  templateUrl: './qrgenerador.component.html',
  styleUrls: ['./qrgenerador.component.scss']
})
export class QrgeneradorComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  code: Array<any> = [];
  
  errorStatus: Boolean = false;
  errorMsg: string = "";
  public qrCodeStr: string;

  constructor(private formBuilder: FormBuilder) {
    this.qrCodeStr = 'Some string to generate QR Code';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lison: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });

  }

  get f() {
    return this.form!.controls;
  }

  codeGenerate() {
    this.submitted = true;
    this.code=[];
    if (this.form!.valid) {
      for (let index = this.form.value.inicio; index <=this.form!.value.fin; index++) {
        this.code.push(this.form.value.lison+"-" + index.toString());
  
      }
      this.createPdf();
    }
    
  }

  createPdf() {
    var exs = [];
    var i =0;
    var fil =0;
    this.code.forEach(exp => {
      exs.push([{ text: exp + "\n ",fontSize: 9 }, { qr: exp, fit: '70' },{ text: "\n" }]);
      if (i%6==0) {
        fil++;
      } 
      i++;
    });
   var  arregloDeArreglos = []; // Aquí almacenamos los nuevos arreglos
    const LONGITUD_PEDAZOS = fil; // Partir en arreglo de 3
    for (let i = 0; i < exs.length; i += LONGITUD_PEDAZOS) {
      let pedazo = exs.slice(i, i + LONGITUD_PEDAZOS);
      arregloDeArreglos.push(pedazo);
    }

        const pdfDefinition: any = {
          content: [
            {
              alignment: "center",
              table: {
                widths:['*','*','*','*','*','*'],
                body: [
                  arregloDeArreglos                
                ]
              }
            }
          ]
        };
        const pdf = pdfMake.createPdf(pdfDefinition).open();

  }
}
