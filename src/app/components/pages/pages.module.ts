import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    PedidoComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    PagesRoutingModule
  ]
})
export class PagesModule { }
