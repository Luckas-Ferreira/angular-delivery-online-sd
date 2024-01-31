import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Depositar } from 'src/app/interface/Depositar';
import { Lanche } from 'src/app/interface/Lanche';
import {Pedido} from 'src/app/interface/Pedido'
import { debug } from 'src/app/interface/debug';
import { SharedDataService } from 'src/app/service/SharedData.service';
import { MoneyService } from 'src/app/service/money.service';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  modalRef!: BsModalRef;
  dataHeader!: any;
  dataCurl!: any;
  dataBody!: any;
  @ViewChild('debbug') debbug!: TemplateRef<any>;
  dataLanche: Lanche[] = [];
  statusDebug!: boolean;
  total: number = 0;
  fraseAlert: string = '';
  config2 = {
    class: 'modal-dialog-centered',
    backdrop: 'static' as 'static'
  }
  constructor ( private Depositar: MoneyService, private modalService: BsModalService, private shared: SharedDataService, private pedido: PedidoService){
    if(localStorage.getItem('debug') == 'yes'){
      this.statusDebug = true;
    }else if(localStorage.getItem('debug') == 'no'){
      this.statusDebug = false;
    }
  }
  ngOnInit(): void {
    this.shared.currentLanches.subscribe(lanches => {
      this.dataLanche = lanches
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = 0;
    for (let lanche of this.dataLanche) {
      this.total += lanche.valor * lanche.quantSelect;
    }
  }

  fazerPedido(){
    if(this.dataLanche.length > 0){
      let quantTotal = 0
      let saldoTotal = 0
      let pedido = this.dataLanche.map(lanche => {
        quantTotal += lanche.quantSelect
        saldoTotal += lanche.valor * lanche.quantSelect;
        return {lanche_id: lanche.lanche_id, quantDispo: lanche.quantSelect};
      });
      let pedidov2 = {
        lanches: pedido 
      }
      this.Depositar.getMoney().subscribe((Response: Depositar) => {
        if(Response.ok){
          if(Response.saldo > quantTotal){
            this.pedido.fazerPedido(pedidov2).subscribe((response: Pedido) => {
              if(response.ok){
                this.Depositar.retirarMoney({valor: saldoTotal}).subscribe((response: Depositar) => {
                  if(response.ok){
                    const alert = document.getElementById('Success');
                    alert!.classList.remove('d-none');
                    setTimeout(() => {
                      alert!.classList.add('d-none');
                    }, 4000);
                  }else{
                    this.fraseAlert = 'Saldo insuficiente';
                    const alert = document.getElementById('Error');
                    alert!.classList.remove('d-none');
                    setTimeout(() => {
                      alert!.classList.add('d-none');
                    }, 4000);
                  }
                })
                
              }else{
                this.fraseAlert = response.message!;
                const alert = document.getElementById('Error');
                alert!.classList.remove('d-none');
                setTimeout(() => {
                  alert!.classList.add('d-none');
                }, 4000);
              }
            })
          }else{
            this.fraseAlert = 'Saldo insuficiente';
            const alert = document.getElementById('Error');
            alert!.classList.remove('d-none');
            setTimeout(() => {
              alert!.classList.add('d-none');
            }, 4000);
          }
        }
      })
    }else{
      this.fraseAlert = 'Não existe um pedido feito';
          const alert = document.getElementById('Error');
          alert!.classList.remove('d-none');
          setTimeout(() => {
            alert!.classList.add('d-none');
          }, 4000);
    }
    if(!this.statusDebug){
      this.modalRef.hide();
    }
  }

  advanceApi(template: TemplateRef<any>) {
    let pedido = this.dataLanche.map(lanche => {
      return {lanche_id: lanche.lanche_id, quantDispo: lanche.quantSelect};
    });
    let pedidov2 = {
      lanches: pedido 
    }
    this.pedido.fazerPedido({debug: true, pedido}).subscribe((response: debug) => {
      if(response.ok){
        var header = JSON.stringify(response.headers, null, 2).replace('{', '').replace('}', '');
        var body = JSON.stringify(response.body, null, 2).replace('{', '').replace('}', '')
        var curl = JSON.stringify(response.curl, null, 2);
        this.dataHeader = header
        this.dataCurl = curl
        this.dataBody = body
        this.modalRef = this.modalService.show(template, this.config2);
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
