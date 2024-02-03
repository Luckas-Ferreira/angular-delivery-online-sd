import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pedido } from 'src/app/interface/Pedido';
import { debug } from 'src/app/interface/debug';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-show-pedidos',
  templateUrl: './show-pedidos.component.html',
  styleUrls: ['./show-pedidos.component.css']
})
export class ShowPedidosComponent implements OnInit{
  modalRef!: BsModalRef;
  @ViewChild('debbug') debbug!: TemplateRef<any>;
  dataPedido: any = [];
  pedidoVerification: boolean = false;
  dataHeader: any;
  dataCurl: any;
  dataBody: any;
  statusDebug!: boolean;
  config2 = {
    class: 'modal-dialog-centered',
    backdrop: 'static' as 'static'
  }
  constructor(private pedido: PedidoService, private modalService: BsModalService){
    if(localStorage.getItem('debug') == 'yes'){
      this.statusDebug = true;
    }else if(localStorage.getItem('debug') == 'no'){
      this.statusDebug = false;
    }
  }
  ngOnInit(): void {
    this.pedido.getPedido().subscribe((response: Pedido) => {
      if(response.ok){
        this.dataPedido = response.pedidos
      }
    })
  }

  advanceApi(){
    this.pedido.limparPedidos({debug: true}).subscribe((response: debug) => {
      if(response.ok){
        var header = JSON.stringify(response.headers, null, 2).replace('{', '').replace('}', '');
        var body = JSON.stringify(response.body, null, 2).replace('{', '').replace('}', '')
        var curl = JSON.stringify(response.curl, null, 2);
        this.dataHeader = header
        this.dataCurl = curl
        this.dataBody = body
        setTimeout(() => {
          this.modalRef = this.modalService.show(this.debbug, this.config2);
        }, 1000);
      }
    })
  }
  
  LimparPedidos(){
    this.pedido.limparPedidos({}).subscribe((response: Pedido) => {
      this.pedidoVerification = response.ok;
      if(response.ok){
        this.dataPedido = [];
        this.pedidoVerification = false;
      }
    })
    if(!this.statusDebug){
      this.modalRef.hide();
    }
  }
}
