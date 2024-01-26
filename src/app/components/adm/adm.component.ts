import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {
  formCreateLanche!: FormGroup
  formPhotos!: FormGroup
  modalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(private router: Router, private modalService: BsModalService){}

  ngOnInit(): void {
    this.formPhotos = new FormGroup({
      fotoLanche: new FormControl(null, [Validators.required]),
    }),
    this.formCreateLanche = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required])
    })
  }
  get foto() {
    return this.formPhotos.get('foto')!;
  }
  get nome() {
    return this.formCreateLanche.get('nome')!;
  }
  get descricao() {
    return this.formCreateLanche.get('descricao')!;
  }
  get valor() {
    return this.formCreateLanche.get('valor')!;
  }
  get quantidade() {
    return this.formCreateLanche.get('quantidade')!;
  }

  validateRegister() {
    if (
      this.formCreateLanche.get('nome')!.invalid
    ) {
      return false;
    }
    return true;
  }
  depositar(){
    if(this.validateRegister()){
      this.router.navigateByUrl('inicio')
    }
    
  }

  fileChangeEvent(event: any): void {
    // this.currentInput = event.target;
    // if (this.addImageValidation(event)) {
    //   this.showImage(this.img);
    //   this.imageChangedEvent = event;
    // }else {
    //   this.formPhotos.get('foto')!.reset();
    //   this.formRegister.get('foto')!.reset();
    //   event.target.value = '';
    //   this.imageVerification(this.modal)
    // }
  }

  adicionarLanche( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config)
}

}
