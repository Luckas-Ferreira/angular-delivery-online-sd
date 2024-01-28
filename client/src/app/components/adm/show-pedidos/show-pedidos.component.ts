import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interface/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-show-pedidos',
  templateUrl: './show-pedidos.component.html',
  styleUrls: ['./show-pedidos.component.css']
})
export class ShowPedidosComponent implements OnInit{
  dataPedido: any = [];

  constructor(private pedido: PedidoService){}

  ngOnInit(): void {
    this.pedido.getPedido().subscribe((response: Pedido) => {
      if(response.ok){
        this.dataPedido = response.pedidos
      }
    })
  }



  }
