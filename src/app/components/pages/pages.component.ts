import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  modalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private modalService: BsModalService){}

  retirarValor( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config)
}

  deixarFirma(){
    const alert = document.getElementById('success');
    alert!.classList.remove('d-none');
    setTimeout(() => {
      alert!.classList.add('d-none');
    }, 7000);
  }
}
