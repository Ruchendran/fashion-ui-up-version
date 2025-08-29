import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators,FormsModule} from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
@Component({
  selector: 'app-admin-upload',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './admin-upload.component.html',
  styleUrl: './admin-upload.component.scss'
})
export class AdminUploadComponent implements OnInit {
  submitForm=false;
  private apiService = inject(ApiserviceService); 
  constructor(){

  }

  productData=new FormGroup({
    prodImg:new FormControl('',Validators.required),
    prodName:new FormControl('',Validators.required),
    prodPrice:new FormControl('',Validators.required),
    prodDes:new FormControl(' ',Validators.required)
  })
  ngOnInit(): void {
    if(this.productData.valid){

    }
  }
  onSubmit=()=>{
    this.apiService.adminUpload(this.productData.value).subscribe((data)=>{
      console.log(data);
    });
    this.productData.reset();
    this.productData.patchValue({
      prodImg:''
    });
    window.location.reload();
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


