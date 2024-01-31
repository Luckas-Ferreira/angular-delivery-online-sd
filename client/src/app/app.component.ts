import { Component, OnInit, TemplateRef } from '@angular/core';
import { Depositar } from './interface/Depositar';
import { Router } from '@angular/router';
import { MoneyService } from './service/money.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dataSaldo: number = 0;
  modalRef!: BsModalRef;
  title = 'delivery-online';
  Router = '';
  statusDebug: boolean = false;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private router: Router, private Depositar: MoneyService, private modalService: BsModalService){
    if(localStorage.getItem('debug') == 'yes'){
      this.statusDebug = true;
    }else if(localStorage.getItem('debug') == 'no'){
      this.statusDebug = false;
    }
  }
  ngOnInit(): void {
    this.Depositar.getMoney().subscribe((response: Depositar) => {
      if(response.ok){
        this.dataSaldo = response.saldo;
      }else{
        this.router.navigateByUrl('/depositar');
      }
    })
  }
  debug(){
    this.statusDebug = !this.statusDebug
    if(this.statusDebug){
      localStorage.setItem('debug', 'yes');
      this.statusDebug = true;
    }else{
      localStorage.setItem('debug', 'no');
      this.statusDebug = false;
    }
    window.location.reload();
  }

  runDebug(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }
  get Routers(){
    return this.router.url;
  }
  deixarFirma(){
    this.Depositar.retirarMoney({valor: this.dataSaldo}).subscribe((response: Depositar) => {
      if(response.ok){
        this.dataSaldo = response.saldo;
        const alert = document.getElementById('SSuccess');
        alert!.classList.remove('d-none');
        setTimeout(() => {
          alert!.classList.add('d-none');
        }, 7000);
      }
    })
    if(!this.statusDebug){
      this.modalRef.hide();
    }
  }
}
