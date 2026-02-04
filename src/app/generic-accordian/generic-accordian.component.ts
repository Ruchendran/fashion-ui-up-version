import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

export interface Props{
  contentColor:string,
  accordianWidth:string,
  heading:string,
  description:string,
  price:any,
  img:string,
  quantity:number
}

@Component({
  selector: 'app-generic-accordian',
  imports: [CommonModule],
  templateUrl: './generic-accordian.component.html',
  styleUrl: './generic-accordian.component.scss'
})
export class GenericAccordianComponent implements OnInit {
  @Input('reqProps') reqProps!:Props;
  accordianShow=false;
  notInitial=false;
  constructor(){

  }
  ngOnInit(): void {
     
  }
  accordianEvent=()=>{
    this.accordianShow=!this.accordianShow;
    this.notInitial=true;
  }
}
