import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { MoneyService } from 'src/app/service/money.service';
import { Depositar } from 'src/app/interface/Depositar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  modalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private modalService: BsModalService, private depositar: MoneyService, private router: Router){}

  ngOnInit(): void {
    this.depositar.getMoney().subscribe((response: Depositar) => {
      if(response.ok){
        return
      }else{
        this.router.navigateByUrl('/depositar');
      }
    })
  }

  adicionarQuantidade( template: TemplateRef<any>){
      this.modalRef = this.modalService.show(template, this.config)
  }
}
