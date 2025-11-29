import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  imports: [],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {
  @Input('inputMsg') messageVal:any;
  @Output('sendEvent') sendEvent:EventEmitter<any>=new EventEmitter<any>;
  eventDecision=(eventVal:boolean)=>{
    this.sendEvent.emit(eventVal);
  }
  closeModal=(eventVal:boolean)=>{
    this.sendEvent.emit(eventVal);
  }
}
