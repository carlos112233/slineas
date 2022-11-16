import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './master_page/header/header.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ReportesComponent } from './views/reportes/reportes.component';
import { QrgeneradorComponent } from './views/qrgenerador/qrgenerador.component';
import { NparteComponent } from './views/nparte/nparte.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashbord', component: DashboardComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'qrgenerador', component: QrgeneradorComponent },
  { path: 'nparte', component: NparteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  HeaderComponent,
  LoginComponent,
  DashboardComponent,
  ReportesComponent,
  QrgeneradorComponent,
];