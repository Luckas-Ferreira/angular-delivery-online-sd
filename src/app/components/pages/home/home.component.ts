import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { MoneyService } from 'src/app/service/money.service';
import { Depositar } from 'src/app/interface/Depositar';
import { Router } from '@angular/router';
import { LancheService } from 'src/app/service/lanche.service';
import { Lanche } from 'src/app/interface/Lanche';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dataLanche: Lanche[] = [];
  @Output() selectLancheEvent = new EventEmitter<Lanche[]>();

  selectLanche: Lanche[] = [];
  modalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private lanche: LancheService, private modalService: BsModalService, private depositar: MoneyService, private router: Router){}

  ngOnInit(): void {
    this.depositar.getMoney().subscribe((response: Depositar) => {
      if(response.ok){
        this.getLanches()
      }else{
        this.router.navigateByUrl('/depositar');
      }
    })
  }

  onSelectLanche() {
    this.selectLancheEvent.emit(this.selectLanche);
  }

  adicionarQuantidade( template: TemplateRef<any>){
      this.modalRef = this.modalService.show(template, this.config)
  }
  getLanches(){
    this.lanche.getLanches().subscribe((response: Lanche) => {
      if(response.ok){
        this.dataLanche = response.lanche
      }
    }) 
  }
}
