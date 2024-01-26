import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './adm.component';
import { ShowPedidosComponent } from './show-pedidos/show-pedidos.component';
import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [
  {
    path: 'admin', 
    component: AdmComponent, 
    children: [
      { path: 'pedidos', component: ShowPedidosComponent},
      { path: 'lanches', component: HomeComponent},
      {path: '', pathMatch:'prefix', redirectTo:'pedidos'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
