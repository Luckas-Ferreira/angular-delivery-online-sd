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

  depositarMoney(object: object): Observable<any>{
    return this.http.post<any>(this.DepositarMoney, object)
  }
  retirarMoney(object: object): Observable<any>{
    return this.http.post<any>(this.RetirarMoney, object)
  }
  getMoney(): Observable<any>{
    return this.http.post<any>(this.GetMoney, [])
  }
}
