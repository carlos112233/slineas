import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashbord: string = '';
  reportes: string = 'reportes';
  qr: string = 'qrgenerador';
  nparte: string = 'nparte';
  constructor() { }

  ngOnInit(): void {
  }

}
