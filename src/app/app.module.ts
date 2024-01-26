import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmComponent } from './components/adm/adm.component';
import { PagesModule } from './components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepositoComponent } from './components/pages/deposito/deposito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPedidosComponent } from './components/adm/show-pedidos/show-pedidos.component';
@NgModule({
  declarations: [
    AppComponent,
    AdmComponent,
    DepositoComponent,
    ShowPedidosComponent,
  ],
  imports: [
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
