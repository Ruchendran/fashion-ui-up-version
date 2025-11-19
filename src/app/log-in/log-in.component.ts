import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  adminUser: boolean = false;
  constructor(private apiService: ApiserviceService, private route: Router, @Inject(PLATFORM_ID) private platformId: Object
    , public shareData: SharedataService) { }
  userForm: any;
  register = false;
  eyeOpen = false;
  forgotPassword=false;
  onClickeye() {
    this.eyeOpen = !this.eyeOpen;
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      userMail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      newPassword:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required)
    })
  }
  onRegister() {
    this.register = !this.register;
    this.adminUser = false;
    this.forgotPassword=false;
  }
  onSubmit = () => {
    this.shareData.loader.set(true);
    //This is only for Register users.
    console.log(this.userForm.value)
    if (this.adminUser) {
      this.apiService.getAdminUser(this.userForm.value?.userMail).subscribe((res: any) => {
        console.log(res, "sssss");
        this.shareData.loader.set(false)
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.clear();
          sessionStorage.setItem('adminUser', 'true');
        }
        this.route.navigate(['/admin']);
      }, er => {
        this.shareData.loader.set(false)
      })
    }
    else if (this.register && !this.adminUser && !this.forgotPassword) {
      this.apiService.registerUser(this.userForm.value).subscribe((res: any) => {
        this.shareData.loader.set(true)
        this.shareData.setLogInUserVal(this.userForm?.value?.userName);
        if (res.status == 200) {
           this.shareData.loader.set(false)
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage?.setItem('user', this.userForm?.value?.userName);
            sessionStorage?.setItem('password', this.userForm?.value?.password);
            sessionStorage.setItem('userToken', res.userToken)
          }
          this.route.navigate(["/"]);

        }
        if (res.status == 403) {
           this.shareData.loader.set(false)
          alert(res.message + " Plesase login");
        }
      },
        (error) => {
          this.shareData.loader.set(false)
          alert("Something went wrong!!!!!!!");
        })
    }
    //This is only for login users.
    else if(!this.register && !this.adminUser && !this.forgotPassword ) {
      this.apiService.loginUser(this.userForm.value).subscribe((res: any) => {
        this.shareData.loader.set(false)
        this.shareData.setLogInUserVal(res?.user);
        if (res.status == 200) {
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage?.setItem('user', res?.user);
            sessionStorage?.setItem('password', this.userForm?.value?.password);
            sessionStorage.setItem('userToken', res.userToken)
          }
          this.route.navigate(["/"]);
        }
        else {
          alert(res.message);
        }
      },
        (error) => {
          this.shareData.loader.set(false)
          alert("Something went wrong!!!!!!!");
        }
      )
    }
    else if(this.forgotPassword){
      if(this.userForm.value.newPassword == this.userForm.value.confirmPassword){
        this.shareData.loader.set(false);
        this.forgotPassword=false;
        this.apiService.resetPassword(this.userForm.value.userMail,this.userForm.value.newPassword).subscribe((res:any)=>{
          this.shareData.setModalMsg(res.message);
        },er=>{
          this.shareData.setModalMsg(er.message);
        })
      }
      else{
        this.shareData.loader.set(false)
        this.shareData.setModalMsg("pls make the password match!");
      }
    }
  }
  loginAdmin = () => {
    this.adminUser = true;
  }
  normalUser = () => {
    this.adminUser = false;
  }
  forgotPas=()=>{
    this.forgotPassword=true;
  }
}
