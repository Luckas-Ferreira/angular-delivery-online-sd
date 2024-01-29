import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Depositar } from 'src/app/interface/Depositar';
import { Lanche } from 'src/app/interface/Lanche';
import {Pedido} from 'src/app/interface/Pedido'
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
      console.log(this.dataLanche);
      
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
        saldoTotal += lanche.valor;
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
    this.modalRef = this.modalService.show(template, this.config2);
  }
}
