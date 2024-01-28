import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Lanche } from 'src/app/interface/Lanche';
import { LancheService } from 'src/app/service/lanche.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {
  fraseAlert: string = '';
  modalRef!: BsModalRef;
  @ViewChild('debbug') debbug!: TemplateRef<any>;
  spinner: boolean = true;
  formCreateLanche!: FormGroup
  formPhotos!: FormGroup
  formData = new FormData();
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  config2 = {
    class: 'modal-dialog-centered',
    backdrop: 'static' as 'static'
  }
  constructor(
    private modalService: BsModalService,
    private lanche: LancheService){}

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
  get fotoLanche() {
    return this.formPhotos.get('fotoLanche')!;
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
      this.formCreateLanche.get('nome')!.invalid ||
      this.formPhotos.get('fotoLanche')!.invalid ||
      this.formCreateLanche.get('descricao')!.invalid ||
      this.formCreateLanche.get('valor')!.invalid ||
      this.formCreateLanche.get('quantidade')!.invalid
    ) {
      return false;
    }
    this.formData.append('nome', this.formCreateLanche.get('nome')!.value);
    this.formData.append('descricao', this.formCreateLanche.get('descricao')!.value);
    this.formData.append('valor', this.formCreateLanche.get('valor')!.value);
    this.formData.append('quantDispo', this.formCreateLanche.get('quantidade')!.value);
    return true;
  }
  createLanche(){
    if(this.validateRegister()){
      this.spinner = false;
      this.lanche.createLanche(this.formData).subscribe((Response: Lanche) => {
        if(Response.ok){
          this.fraseAlert = 'Lanche adicionado com sucesso'!;
          const alert = document.getElementById('Success');
          alert!.classList.remove('d-none');
          setTimeout(() => {
            alert!.classList.add('d-none');
          window.location.reload();
          }, 2000);
        }else{
          this.fraseAlert = Response.message!;
          const alert = document.getElementById('error');
          alert!.classList.remove('d-none');
          setTimeout(() => {
            alert!.classList.add('d-none');
          }, 4000);
        }
        this.spinner = true;
        this.modalRef.hide();
      })
    }
    
  }

  fileChangeEvent(event: any): void {
    let file = event.target.files[0];
    this.formData.append('foto', file, this.formPhotos.get('fotoLanche')!.value.nome);
  }
  
  adicionarLanche( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config)
}

advanceApi(template: TemplateRef<any>) {
  if(this.validateRegister()){
    this.modalRef.hide();
    setTimeout(() => {
      this.modalRef = this.modalService.show(template, this.config2);
    }, 1000);
  }
}

}
