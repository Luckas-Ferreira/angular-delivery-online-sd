import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'delivery-online';
  statusDebug: boolean = false;
  constructor(){
    if(localStorage.getItem('debug') == 'yes'){
      this.statusDebug = true;
    }else if(localStorage.getItem('debug') == 'no'){
      this.statusDebug = false;
    }
  }
  debug(){
    this.statusDebug = !this.statusDebug
    if(this.statusDebug){
      localStorage.setItem('debug', 'yes');
      this.statusDebug = true;
    }else{
      localStorage.setItem('debug', 'no');
      this.statusDebug = false;
    }
    window.location.reload();
  }
}
