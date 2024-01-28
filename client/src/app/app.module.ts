import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepositoComponent } from './components/pages/deposito/deposito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPedidosComponent } from './components/adm/show-pedidos/show-pedidos.component';
import { AdmModule } from './components/adm/adm.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DepositoComponent,
    ShowPedidosComponent,
  ],
  imports: [
    PagesModule,
    AdmModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
