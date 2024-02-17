import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lanche } from 'src/app/interface/Lanche';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
    private lancheSource = new Subject<Lanche[]>();
    currentLanches = this.lancheSource.asObservable();
  
    constructor() { }
  
    changeLanches(lanches: Lanche[]) {
      this.lancheSource.next(lanches);
    }
}