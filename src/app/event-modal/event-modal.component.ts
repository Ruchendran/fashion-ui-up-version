import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  imports: [],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {
  @Input('inputMsg') messageVal:any;
  @Input('actionFor') actionFor!:string;
  @Output('sendEvent') sendEvent:EventEmitter<any>=new EventEmitter<any>;
  eventDecision=(eventVal:boolean)=>{
    this.sendEvent.emit({eventVal,actionFor:this.actionFor});
  }
  closeModal=(eventVal:boolean)=>{
    this.sendEvent.emit({eventVal});
  }
}
