import { Injectable } from '@angular/core';
import { pedido } from '../environments/pedido';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private GetPedido = pedido.getPedidos;
  private FazerPedido = pedido.fazerPedido;

  constructor(private http: HttpClient) { }

  getPedido(): Observable<any>{
    return this.http.post<any>(this.GetPedido, [])
  }
  fazerPedido(object: object): Observable<any>{
    return this.http.post<any>(this.FazerPedido, object)
  }
}
