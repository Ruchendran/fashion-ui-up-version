import { Component, Input } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-modal',
  imports: [],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {
  constructor(public sharedData:SharedataService,private route:Router){

  }

  @Input('inputMsg') messageVal:any;
  closeModal=()=>{
    if(this.messageVal == 'Please register or sign in'){
      this.sharedData.setModalMsg('');
      this.route.navigate(['/sign-in']);
    }
    else{
      this.sharedData.setModalMsg('');
    }
    
  }
}
