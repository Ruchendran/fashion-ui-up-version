import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Props{
  contentColor:string,
  parentHeading:string,
  parentWidth:string,
  childProps:
    {
    accordianWidth:string,
    heading:string,
    description:string,
    content:string,
    img:string,
    accordianShow:boolean,
    notInitial:boolean,
    quantity:number,
    price:number
    }[],
    btnText:string,
    btnShow:boolean,
    orderId:string,
    totalPrice:number
  
}


@Component({
  selector: 'app-parent-child-accordian',
  imports: [CommonModule],
  templateUrl: './parent-child-accordian.component.html',
  styleUrl: './parent-child-accordian.component.scss'
})
export class ParentChildAccordianComponent {
@Input('parentProps') reqProps!:Props;
@Output('emitOrderTrack') emitOrderTrack=new EventEmitter<any>;
 parentAccordianShow=false;
 parentNotInitial=false;
  parentAccordianEvent=()=>{
    this.parentAccordianShow=!this.parentAccordianShow;
    this.parentNotInitial=true;
  }
  accordianEvent=(accordian:any)=>{
    accordian.accordianShow=!accordian.accordianShow,
    accordian.notInitial=true
  }
  emitOrder=(orderId:any)=>{
    console.log(orderId,"sss")
    this.emitOrderTrack.emit(orderId);
  }
}
