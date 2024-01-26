import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private modalService: BsModalService){}


  adicionarQuantidade( template: TemplateRef<any>){
      this.modalRef = this.modalService.show(template, this.config)
  }
}
