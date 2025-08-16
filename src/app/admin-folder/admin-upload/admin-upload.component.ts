import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators,FormsModule} from '@angular/forms';
import { File } from 'buffer';

@Component({
  selector: 'app-admin-upload',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './admin-upload.component.html',
  styleUrl: './admin-upload.component.scss'
})
export class AdminUploadComponent implements OnInit {
  submitForm=false;
  constructor(){

  }
  productData=new FormGroup({
    prodImg:new FormControl('',Validators.required),
    prodName:new FormControl('',Validators.required),
    prodPrice:new FormControl('',Validators.required),
    prodDes:new FormControl('file',Validators.required)
  })
  ngOnInit(): void {
    if(this.productData.valid){

    }
  }
  onSubmit=()=>{
    console.log(this.productData.value)
  }
  onChange=(event:Event)=>{
    const input=event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file=input?.files[0]
      const reader=new FileReader();
      reader.onload=()=>{
        this.productData.patchValue({
          prodImg:reader.result as string
        })
      }
      reader.readAsDataURL(file);
    }
  }
}


