import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ShowMsgComponent } from '../show-msg/show-msg.component';
import { FormsModule } from '@angular/forms';
import { CustomStichingFieldsComponent } from '../custom-stiching-fields/custom-stiching-fields.component';

export interface Props{
  accordianWidth:string,
  heading:string,
  description:string,
  price:any,
  img:string,
  quantity:number,
  family:string
}

@Component({
  selector: 'app-generic-accordian',
  imports: [CommonModule,ShowMsgComponent,FormsModule,CustomStichingFieldsComponent],
  templateUrl: './generic-accordian.component.html',
  styleUrl: './generic-accordian.component.scss'
})
export class GenericAccordianComponent implements OnInit {
  stichingFormShow:boolean=false;
  @Input('reqProps') reqProps!:Props;
  accordianShow=false;
  notInitial=false;
  constructor(){

  }

  ngOnInit(): void {
    
  }
  accordianEvent=(event:any)=>{
    event.preventDefault();
    // event.stopPropagation();
    this.accordianShow=!this.accordianShow;
    this.notInitial=true;
  }
  onSelectRadio=(val:string)=>{
    if(val == 'Yes'){
      this.stichingFormShow=true;
      window.scrollTo(0,0);
    }else{
      this.stichingFormShow=false;
    }
  }

  // onSelectRadioFullHand=(val:string)=>{
  //   if(val == 'Yes'){
  //     this.fullHandShirt=true;
  //   }else{
  //     this.fullHandShirt=false;
  //   }
  // }
  // selectStichDesign=(design:string)=>{
  //   this.activeSize=design;
  // }
  // getNumberBasedOnSize=()=>{
  //   if(this.activeSize == 'S'){
  //     return 20;
  //   }
  //   else if(this.activeSize == 'M'){
  //     return 28;
  //   }
  //   else{
  //     return 33;
  //   }
    
  // }
  // closeForm=()=>{
  //   this.stichingFormShow=false;
  // }
  closeFormReceive=(event:Boolean)=>{
    this.stichingFormShow=false;
  }
}
