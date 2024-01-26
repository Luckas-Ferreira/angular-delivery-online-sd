import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmComponent } from './components/adm/adm.component';
import { PagesModule } from './components/pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    AdmComponent,
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
