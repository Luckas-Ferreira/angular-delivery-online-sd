import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmRoutingModule } from './adm-routing.module';
import { AdmComponent } from './adm.component';


@NgModule({
  declarations: [
    AdmComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    AdmRoutingModule
  ]
})
export class AdmModule { }
