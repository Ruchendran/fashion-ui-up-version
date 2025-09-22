import { CommonModule } from '@angular/common';
import { Component, ComponentRef, OnInit, ViewChild,ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule,ReactiveFormsModule,LoaderComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  constructor(private apiService:ApiserviceService,private containerRef:ViewContainerRef,private route:Router){}
  @ViewChild('loaderContainer') loaderContainer!:ComponentRef<any>;
  userForm:any;
  register=false;
  eyeOpen=false;
  // cardList=[
  //   {
  //     name:"Gents Fashion",
  //     label:"Gents Fashion"
  //    },
  //    {
  //     name:"Shirts",
  //     label:'Shirts'
  //    },
  //    {
  //     name:"Pants",
  //     label:"Pants"
  //    },
  //    {
  //     name:"Jeans",
  //     label:"Jeans"
  //    },
  //    {
  //     name:"Smooth",
  //     label:"Smooth"
  //    }
  // ]
  onClickeye(){
    console.log("hit")
    this.eyeOpen=!this.eyeOpen;
  }
  ngOnInit(): void {
    this.userForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required)
    })
  }
  onRegister(){
    this.register=!this.register
  }
  onSubmit=()=>{
    this.showLoader();
    //This is only for Register users.
    if(this.register){
      this.apiService.registerUser(this.userForm.value).subscribe((res:any)=>{
        this.hideLoader();
        this.route.navigate(["/"]);
      },
      (error)=>{
        this.hideLoader();
        alert("Something went wrong!!!!!!!");
      })
    }
    //This is only for login users.
    else{
      this.apiService.loginUser(this.userForm.value).subscribe((res:any)=>{
        this.hideLoader();
       this.route.navigate(["/"]);
      },
      (error)=>{
        this.hideLoader();
        alert("Something went wrong!!!!!!!");
      }
    )
    }
  }
  showLoader=()=>{
   this.loaderContainer=this.containerRef.createComponent(LoaderComponent) 
  }
  hideLoader=()=>{
    this.loaderContainer.destroy();
  }
}
