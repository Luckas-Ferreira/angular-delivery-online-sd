import { Component } from '@angular/core';
import { LancheService } from 'src/app/service/lanche.service';
import {Pedido} from 'src/app/interface/Pedido'
import { PedidoService } from 'src/app/service/pedido.service';
import { Lanche } from 'src/app/interface/Lanche';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  dataPedido: Pedido[] = [];

  constructor(private pedido: PedidoService){}
  ngOnInit(): void {
     
  }
  onLancheSelected(selectLanche: Lanche[]) {
    // Do something with the selected lanche data
  }
  fazerPedido(){
    this.pedido.fazerPedido({}).subscribe((response: Pedido) => {
      if(response.ok){
        
      }
    }) 
  }
}
