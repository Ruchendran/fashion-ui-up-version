import { CommonModule } from '@angular/common';
import { Component, inject, OnInit,ComponentRef,ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators,FormsModule} from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { LoaderComponent } from '../../loader/loader.component';
@Component({
  selector: 'app-admin-upload',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './admin-upload.component.html',
  styleUrl: './admin-upload.component.scss'
})
export class AdminUploadComponent implements OnInit {
  submitForm=false;
  private apiService = inject(ApiserviceService); 
  productFamilyList=['Gents-Wears','Home-Appliences','Foot-Wear'];
  constructor(private containerRef:ViewContainerRef){

  }
  @ViewChild('loaderContainer') loaderContainer!:ComponentRef<any>;
  productData=new FormGroup({
    prodImg:new FormControl('',Validators.required),
    prodName:new FormControl('',Validators.required),
    prodPrice:new FormControl('',Validators.required),
    prodDes:new FormControl('',Validators.required),
    productFamily:new FormControl('Wear',Validators.required)
  })
  ngOnInit(): void {
    if(this.productData.valid){

    }
  }
  onSubmit=()=>{
    this.showLoader();
    if(this.productData.value.prodName && this.productData.value.prodDes && this.productData.value.prodPrice && this.productData.value.productFamily){
      this.apiService.adminUpload(this.productData.value).subscribe((res:any)=>{
        console.log(res);
        this.hideLoader();
      },error=>{
        this.hideLoader();
      });
      this.productData.reset();
      this.productData.patchValue({
        prodImg:''
      });
    }
    else{
     this.hideLoader();
      alert("Please fill the all manditory values.")
    
    }
  }
  onChange=(event:Event)=>{
    const input=event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file=input?.files[0]
      console.log(file.size,"all the values");
      if((file.size/1000)>10){
         this.productData.reset();
         alert('PLease Upload the under the 10KB Images')
      }
      const reader=new FileReader();
      reader.onload=()=>{
        this.productData.patchValue({
          prodImg:reader.result as string
        })
      }
      reader.readAsDataURL(file);
    }
  }
  showLoader = () => {
    this.loaderContainer = this.containerRef.createComponent(LoaderComponent)
  }
  hideLoader = () => {
    this.loaderContainer.destroy();
  }
}


