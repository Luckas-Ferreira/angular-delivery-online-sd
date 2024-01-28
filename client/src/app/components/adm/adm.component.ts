import { Component, TemplateRef } from '@angular/core';
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
  formCreateLanche!: FormGroup
  formPhotos!: FormGroup
  modalRef!: BsModalRef;
  formData = new FormData();
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  constructor(
    private router: Router, 
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
      console.log(this.formCreateLanche.get('nome')!.invalid,
      this.formPhotos.get('fotoLanche')!.invalid,
      this.formCreateLanche.get('descricao')!.invalid,
      this.formCreateLanche.get('valor')!.invalid,
      this.formCreateLanche.get('quantidade')!.invalid)
      return false;
    }
    this.formData.append('nome', this.formCreateLanche.get('nome')!.value);
    this.formData.append('descricao', this.formCreateLanche.get('descricao')!.value);
    this.formData.append('valor', this.formCreateLanche.get('valor')!.value);
    this.formData.append('quantidade', this.formCreateLanche.get('quantidade')!.value);
    return true;
  }
  depositar(){
    if(this.validateRegister()){

      this.lanche.createLanche(this.formData).subscribe((Response: Lanche) => {
        if(Response.ok){
          
        }else{
          
        }
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

}
