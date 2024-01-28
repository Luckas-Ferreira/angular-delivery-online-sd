import { Injectable } from '@angular/core';
import { lanche } from '../environments/lanche';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancheService {

  private GetLanche = lanche.getLanche;
  private GetLanches = lanche.getLanches;
  private CreateLanche = lanche.createLanche;
  private UpdateLanche = lanche.updateLanche;
  private DeleteLanche = lanche.deleteLanche;

  constructor(private http: HttpClient) { }

  getLanche(id: number): Observable<any>{
    return this.http.post<any>(this.GetLanche, id)
  }
  getLanches(): Observable<any>{
    return this.http.post<any>(this.GetLanches, [])
  }
  createLanche(data: FormData): Observable<any>{
    return this.http.post<any>(this.CreateLanche, data)
  }
  updateLanche(object: object): Observable<any>{
    return this.http.post<any>(this.UpdateLanche, object)
  }
  deleteLanche(id: number): Observable<any>{
    return this.http.post<any>(this.DeleteLanche, id)
  }
}
