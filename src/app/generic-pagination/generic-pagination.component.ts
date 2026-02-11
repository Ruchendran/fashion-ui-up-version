import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-pagination',
  imports: [CommonModule],
  templateUrl: './generic-pagination.component.html',
  styleUrl: './generic-pagination.component.scss'
})
export class GenericPaginationComponent implements OnInit {

  @Input('paginationDetails') paginationDetails!:any;
  @Output('eventPageEmit') emitPageEmit=new EventEmitter<any>;
  getPages=[1,2,3,4,5]
  activePage=1;
  maxPage:any=0;
  ngOnInit(): void {
      this.maxPage=Math.ceil(this.paginationDetails.totalRecords/9);
      // console.log(this.paginationDetails,"ssss",this.maxPage)
      this.emitPageEmit.emit(this.activePage);
  }
  increasePage=()=>{
    if(this.activePage<this.maxPage){
      this.activePage+=1;
      this.emitPageEmit.emit(this.activePage);
      if(this.activePage>5){
        const finalVal=this.getPages[4]+1;
        let initVal=finalVal-4
        const getList=[];
        if(finalVal<=this.maxPage){
          for(initVal;initVal<=finalVal;initVal++){
            getList.push(initVal);
          }
          this.getPages=getList;
        }
      }
    }
  }
  decreasePage=()=>{
    if(this.activePage>1){
      this.activePage-=1;
      this.emitPageEmit.emit(this.activePage);
      let initVal=this.getPages[0]-1;
      const finalVal=initVal+5;
      const getList=[];
      if(initVal!=0){
        for(initVal;initVal<finalVal;initVal++){
          getList.push(initVal);
        }
        this.getPages=getList;
      }
    }
  }
  selectPage=(page:number)=>{
    this.activePage=page;
    this.emitPageEmit.emit(this.activePage);
  }
}
