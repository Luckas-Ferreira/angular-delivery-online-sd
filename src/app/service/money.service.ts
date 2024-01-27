import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { depositar } from '../environments/depositar';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  private DepositarMoney = depositar.depositarMoney;
  private GetMoney = depositar.getMoney;
  private RetirarMoney = depositar.retirarMoney;

  constructor(private http: HttpClient) { }

  depositarMoney(valor: string): Observable<any>{
    return this.http.post<any>(this.DepositarMoney, valor)
  }
  retirarMoney(valor: string): Observable<any>{
    return this.http.post<any>(this.RetirarMoney, valor)
  }
  getMoney(): Observable<any>{
    return this.http.post<any>(this.GetMoney, [])
  }
}
