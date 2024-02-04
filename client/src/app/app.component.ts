import { Component, OnInit, TemplateRef } from '@angular/core';
import { Depositar } from './interface/Depositar';
import { Router } from '@angular/router';
import { MoneyService } from './service/money.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { debug } from './interface/debug';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  fraseAlert: string = '';
  dataHeader: any;
  dataCurl: any;
  dataBody: any;
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
    this.Depositar.retirarMoney({debug: true}).subscribe((response: debug) => {
      if(response.ok){
        var header = JSON.stringify(response.headers, null, 2).replace('{', '').replace('}', '');
        var body = JSON.stringify(response.body, null, 2).replace('{', '').replace('}', '')
        var curl = JSON.stringify(response.curl, null, 2);
        this.dataHeader = header
        this.dataCurl = curl
        this.dataBody = body
        setTimeout(() => {
          this.modalRef = this.modalService.show(template, this.config);
        }, 1000);
      }
      else{
          this.fraseAlert = response.message!;
          const alert = document.getElementById('Error');
          alert!.classList.remove('d-none');
          setTimeout(() => {
          alert!.classList.add('d-none');
          
          }, 3000);
      }
    })
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
          this.router.navigateByUrl('/depositar');
        }, 2000);
      }
    })
    if(!this.statusDebug){
      this.modalRef.hide();
    }
  }
}
