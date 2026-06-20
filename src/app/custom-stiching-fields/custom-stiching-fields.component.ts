import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-custom-stiching-fields',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './custom-stiching-fields.component.html',
  styleUrl: './custom-stiching-fields.component.scss'
})
export class CustomStichingFieldsComponent implements OnInit {
  @Output('closeForm') closeFormEvent:EventEmitter<any>=new EventEmitter<any>;
  customStichForm:any;
  constructor(){

  }

activeSize:string='S';
fullHandShirt:boolean=false;
ngOnInit(): void {
    this.customStichForm= new FormGroup({
      shirtHeight:new FormControl('Select Height',Validators.required),
      shirtWidth:new FormControl('Select Shirt Width',Validators.required),
      shirtShoulder:new FormControl('Select Shoulder',Validators.required),
      handRound:new FormControl('Select Hand Round',Validators.required),
      fullHand:new FormControl('No',Validators.required),
      handHeight:new FormControl('Select Hand Height',Validators.required),
      handMidRound:new FormControl('Hand Middle Round',Validators.required),
      cupRound:new FormControl('Cup Round',Validators.required),
      halfHandHeight:new FormControl('Select Hand Height',Validators.required),
      // halfHandRound:new FormControl('Select Hand Round',Validators.required)
    })
}
 onSelectRadioFullHand=(val:string)=>{
    if(val == 'Yes'){
      this.fullHandShirt=true;
    }else{
      this.fullHandShirt=false;
    }
  }
    selectStichDesign=(design:string)=>{
    this.activeSize=design;
  }
   getNumberBasedOnSize=()=>{
    if(this.activeSize == 'S'){
      return 20;
    }
    else if(this.activeSize == 'M'){
      return 28;
    }
    else{
      return 33;
    }
    
  }
    closeForm=()=>{
      this.closeFormEvent.emit(true)
  }
  onSubmitForm=()=>{
    console.log(this.customStichForm.value,"vals");
  }
}
