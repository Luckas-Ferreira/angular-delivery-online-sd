import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit{
  formDeposito!: FormGroup
  constructor(private router: Router){}

  ngOnInit(): void {
    this.formDeposito = new FormGroup({
      valor: new FormControl('', [Validators.required])
    })
  }
  get valor() {
    return this.formDeposito.get('valor')!;
  }

  depositar(){
    if(this.formDeposito.get('valor')!.valid){
      this.router.navigateByUrl('inicio')
    }
    
  }

}
