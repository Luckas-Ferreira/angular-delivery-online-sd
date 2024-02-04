import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Depositar } from 'src/app/interface/Depositar';
import { debug } from 'src/app/interface/debug';
import { MoneyService } from 'src/app/service/money.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit{
  @ViewChild('debbug') debbug!: TemplateRef<any>;
  formDeposito!: FormGroup;
  dataHeader: any;
  dataCurl: any;
  dataBody: any;
  modalRef!: BsModalRef;
  statusDebug!: boolean;
  fraseAlert: string = '';
  config = {
    class: 'modal-dialog-centered',
    backdrop: 'static' as 'static'
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
        this.router.navigateByUrl('/inicio');
      }
    })
    this.formDeposito = new FormGroup({
      valor: new FormControl('', [Validators.required])
    })
  }
  get valor() {
    return this.formDeposito.get('valor')!;
  }

  depositar(){
    if(!this.statusDebug){
      this.modalRef.hide();
    }
    if(this.formDeposito.get('valor')!.valid){
      this.Depositar.depositarMoney({valor: this.formDeposito.get('valor')!.value}).subscribe((response: Depositar) => {
        if(response.ok){
          window.location.href = 'inicio';
        }else{
          this.fraseAlert = response.message!;
          const alert = document.getElementById('error');
          alert!.classList.remove('d-none');
          setTimeout(() => {
            alert!.classList.add('d-none');
          }, 7000);
        }
      })
    }
  }

  advanceApi(template: TemplateRef<any>) {
    if(this.formDeposito.get('valor')!.valid){
      this.Depositar.depositarMoney({debug: true, valor: this.formDeposito.get('valor')!.value}).subscribe((response: debug) => {
        if(response.ok){
          var header = JSON.stringify(response.headers, null, 2).replace('{', '').replace('}', '');
          var body = JSON.stringify(response.body, null, 2).replace('{', '').replace('}', '')
          var curl = JSON.stringify(response.curl, null, 2);
          this.dataHeader = header
          this.dataCurl = curl
          this.dataBody = body
          this.modalRef = this.modalService.show(template, this.config);
        }
        else{
            this.fraseAlert = response.message!;
            const alert = document.getElementById('error');
            alert!.classList.remove('d-none');
            setTimeout(() => {
            alert!.classList.add('d-none');
            }, 7000);
        }
      })
      
    }
  }
}
