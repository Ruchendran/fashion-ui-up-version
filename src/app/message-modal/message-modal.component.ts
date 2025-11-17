import { Component, Input } from '@angular/core';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-message-modal',
  imports: [],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {
  constructor(public sharedData:SharedataService){

  }

  @Input('inputMsg') messageVal:any;
  closeModal=()=>{
    this.sharedData.setModalMsg('');
  }
}
