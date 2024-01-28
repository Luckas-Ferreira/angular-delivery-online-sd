import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { LancheService } from 'src/app/service/lanche.service';
import { Lanche } from 'src/app/interface/Lanche';
import { SharedDataService } from 'src/app/service/SharedData.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dataLanche: Lanche[] = [];
  fraseAlert: string = '';
  lancheAtual!: Lanche;
  studentVerification: boolean = true;
  selectedLanche!: Lanche;
  selectLanche: Lanche[] = [];
  quantSelect!: FormGroup;
  modalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog-centered'
  }
  config2 = {
    class: 'modal-dialog-centered',
    backdrop: 'static' as 'static'
  }
  constructor(private router: Router, private shared: SharedDataService, private lanche: LancheService, private modalService: BsModalService){}

  ngOnInit(): void {
   this.getLanches()
   this.quantSelect = new FormGroup({
    quantSelected: new FormControl('', [Validators.required])
  })
  }
  quantidadeValida(lanche: Lanche): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const invalid = control.value > lanche.quantDispo;
      return invalid ? {invalidQuantity: {value: control.value}} : null;
    };
  }

  get Router(){
    return this.router.url;
  }
  get quantSelected(){
    return this.quantSelect.get('quantSelected')!;
  }

  remover(lanche: Lanche){
    this.lanche.deleteLanche({lanche_id: lanche.lanche_id}).subscribe((Response: Lanche) =>{
      if(Response.ok){
        this.fraseAlert = 'Lanche apagado com sucesso'!;
        const alert = document.getElementById('success');
        this.getLanches();
        alert!.classList.remove('d-none');
        setTimeout(() => {
          alert!.classList.add('d-none');
        }, 4000);
      }else{
        this.fraseAlert = Response.message!;
        const alert = document.getElementById('error');
        alert!.classList.remove('d-none');
        setTimeout(() => {
          alert!.classList.add('d-none');
        }, 4000);
      }
    })
  }

  adicionarQuantidade(template: TemplateRef<any>, lanche: Lanche){
    this.selectedLanche = lanche;
    this.quantSelect.get('quantSelected')!.setValidators([Validators.required, this.quantidadeValida(this.selectedLanche)]);
    this.quantSelect.get('quantSelected')!.updateValueAndValidity();
    this.modalRef = this.modalService.show(template, this.config);
  }
  
  getLanches(){
    this.lanche.getLanches().subscribe((response: Lanche) => {
      this.studentVerification= response.ok;
      if(response.ok){
        this.dataLanche = response.lanches;
      }
    }) 
  }

  advanceApi(template: TemplateRef<any>, lanche: Lanche) {
    this.lancheAtual = lanche;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  adicionar(){
    if(this.quantSelect.get('quantSelected')!.valid){
      if (this.selectedLanche.quantDispo > 0) {
        console.log(this.selectedLanche.quantDispo);
        if(this.selectedLanche.quantDispo >= this.quantSelect.get('quantSelected')!.value){
          this.selectedLanche.quantDispo = this.selectedLanche.quantDispo - this.quantSelect.get('quantSelected')!.value;
          this.selectedLanche.quantSelect = this.quantSelect.get('quantSelected')!.value;
          this.selectLanche.push(this.selectedLanche);
          this.shared.changeLanches(this.selectLanche);
        }else{
          this.quantSelect.setErrors({invalidQuantity: true});
        }
      }else{
        this.fraseAlert = 'Quantidade de lanches indísponivel'!;
          const alert = document.getElementById('error');
          alert!.classList.remove('d-none');
          setTimeout(() => {
            alert!.classList.add('d-none');
          }, 4000);
      }
      this.modalRef.hide();
    }
  }
}
