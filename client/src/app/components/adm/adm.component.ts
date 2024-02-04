import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Lanche } from 'src/app/interface/Lanche';
import { debug } from 'src/app/interface/debug';
import { LancheService } from 'src/app/service/lanche.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {
  file: any;
  dataHeader: any;
  dataCurl: any;
  dataBody: any;
  fraseAlert: string = '';
  modalRef!: BsModalRef;
  @ViewChild('debbug') debbug!: TemplateRef<any>;
  spinner: boolean = true;
  formCreateLanche!: FormGroup
  formPhotos!: FormGroup
  formData = new FormData();
  statusDebug!: boolean;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  config2 = {
    class: 'modal-dialog-centered',
    backdrop: 'static' as 'static'
  }
  constructor(
    private modalService: BsModalService,
    private lanche: LancheService){
      if(localStorage.getItem('debug') == 'yes'){
        this.statusDebug = true;
      }else if(localStorage.getItem('debug') == 'no'){
        this.statusDebug = false;
      }
    }

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
    this.formData = new FormData();
    if(this.validateRegister()){
      this.spinner = false;
      this.formData.append('foto', this.file, this.formPhotos.get('fotoLanche')!.value.nome);
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
    this.file = event.target.files[0];
    this.formData.append('foto', this.file, this.formPhotos.get('fotoLanche')!.value.nome);
  }
  
  adicionarLanche( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config)
}

advanceApi(template: TemplateRef<any>) {
  this.formData = new FormData();
  if(this.validateRegister()){
    this.formData.append('foto', this.file, this.formPhotos.get('fotoLanche')!.value.nome);
    this.modalRef.hide();
    this.formData.append('debug', 'true');
    this.lanche.createLanche( this.formData).subscribe((response: debug) => {
      if(response.ok){
        var header = JSON.stringify(response.headers, null, 2).replace('{', '').replace('}', '');
        var body = JSON.stringify(response.body, null, 2).replace('{', '').replace('}', '')
        var curl = JSON.stringify(response.curl, null, 2);
        this.dataHeader = header
        this.dataCurl = curl
        this.dataBody = body
        setTimeout(() => {
          this.modalRef = this.modalService.show(template, this.config2);
        }, 1000);
      }
      else{
          this.fraseAlert = response.message!;
          const alert = document.getElementById('error');
          alert!.classList.remove('d-none');
          setTimeout(() => {
          alert!.classList.add('d-none');
          }, 7000);
      }
    })
    
  }
}

}
