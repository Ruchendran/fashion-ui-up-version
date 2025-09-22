import { CommonModule } from '@angular/common';
import {  Component,ElementRef,ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeImg1=true;
  activeImg2=false;
  activeImg3=false;
  @ViewChild('fashionSection') fashionSection!:ElementRef;
  constructor(private router:Router){

  }
  clickSlide=(val:number)=>{
    this.activeImg1=false;
    this.activeImg2=false;
    this.activeImg3=false;
    if(val==1){
      this.activeImg1=true;
    }
    else if(val==2){
      this.activeImg2=true;
    }
    else if(val==3){
      this.activeImg3=true
    }
    let fashionEle=this.fashionSection.nativeElement as HTMLElement;
    fashionEle.classList.remove('fashion-img1');
    fashionEle.classList.remove('fashion-img2');
    fashionEle.classList.remove('fashion-img3');
    setTimeout(()=>{
      fashionEle.classList.add(`fashion-img${val}`);
    },0)
  }
  naToProducts=()=>{
    this.router.navigate(['/products'])
  }
}
