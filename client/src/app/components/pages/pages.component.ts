import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Depositar } from 'src/app/interface/Depositar';
import { MoneyService } from 'src/app/service/money.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
  modalRef!: BsModalRef;
  dataSaldo: number = 0;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private router: Router, private modalService: BsModalService, private Depositar: MoneyService){}
  ngOnInit(): void {
    this.Depositar.getMoney().subscribe((response: Depositar) => {
      if(response.ok){
        this.dataSaldo = response.saldo;
      }else{
        this.router.navigateByUrl('/depositar');
      }
    })
  }

  retirarValor( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config)
}


  deixarFirma(){
    this.Depositar.retirarMoney({valor: this.dataSaldo}).subscribe((response: Depositar) => {
      if(response.ok){
        this.dataSaldo = response.saldo;
        const alert = document.getElementById('success');
        alert!.classList.remove('d-none');
        setTimeout(() => {
          alert!.classList.add('d-none');
        }, 7000);
      }
    })
    
  }
}
