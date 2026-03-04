import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ShowMsgComponent } from '../show-msg/show-msg.component';

export interface Props{
  contentColor:string,
  parentHeading:string,
  parentWidth:string,
  feedBack:Boolean,
  delivered:Boolean,
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
    userStarRating:number,
    productId:string
    }[],
    btnText:string,
    btnShow:boolean,
    orderId:string,
    totalPrice:number,  
}


@Component({
  selector: 'app-parent-child-accordian',
  imports: [CommonModule,ShowMsgComponent],
  templateUrl: './parent-child-accordian.component.html',
  styleUrl: './parent-child-accordian.component.scss'
})
export class ParentChildAccordianComponent implements OnChanges {
  public Array = Array;
@Input('parentProps') reqProps!:Props;
@Output('emitOrderTrack') emitOrderTrack=new EventEmitter<any>;
@Output('emitOrerValueForFedback') emitOrerValueForFedback=new EventEmitter<any>; 
 parentAccordianShow=false;
 parentNotInitial=false;
 ngOnChanges(changes: SimpleChanges): void {
    //  console.log(this.reqProps,"values");
 }
  parentAccordianEvent=()=>{
    this.parentAccordianShow=!this.parentAccordianShow;
    this.parentNotInitial=true;
  }
  accordianEvent=(accordian:any)=>{
    accordian.accordianShow=!accordian.accordianShow,
    accordian.notInitial=true
  }
  emitOrder=(orderId:any)=>{
    // console.log(orderId,"sss")
    this.emitOrderTrack.emit(orderId);
  }
    //fill the stars method.
  fillStar=(product:any,i:number)=>{
    product.userStarRating=i+1;
  }
  // fill out the stars method or delete the stars.
  deleteStar=(product:any,i:number)=>{
    product.userStarRating=0;
  }

    checkFeedbackEnable=(order:any)=>{
    const productsLength=order.length;
    // console.log(order,"sss",productsLength)
    let countUserStarRatingProduct=0;
    order.forEach((product:any)=>{
      if(product.userStarRating>0){
        countUserStarRatingProduct+=1;
      }
    });
    if(countUserStarRatingProduct == productsLength){
      return false;
    }
    else{
    return true;
    }
  }
  emitFeedback=(orderValue:any)=>{
    this.emitOrerValueForFedback.emit(orderValue)
  }
}
