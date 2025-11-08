import { CommonModule } from '@angular/common';
import {  Component,ElementRef,HostListener,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { WearSectionComponent } from '../wear-section/wear-section.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,WearSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @ViewChild('fashionSection') fashionSection!:ElementRef;
  @ViewChild('threeDImg1') threeDImg1!:ElementRef;
  @ViewChild('threeDImg3') threeDImg3!:ElementRef;
  contentAnimation=false;
  constructor(private router:Router){

  }
  ngOnInit(): void {
      // window.location.reload();
  }
  @HostListener('window:scroll')
  onScroll=()=>{
    console.log(window.scrollY)
    if(window.scrollY>300 && window.scrollY<900){
      this.contentAnimation=true;
    }
    else{
      this.contentAnimation=false;
    }
    if(window.scrollY > 1300 && window.scrollY<1400){
      console.log('cartds');
     let image1= this.threeDImg1.nativeElement as HTMLImageElement
     let image1Val=-50+(window.scrollY-1300)/5;
     if(image1Val<0){
      image1.style.transform=`perspective(1000px) rotateY(${image1Val}deg)`
     }
     else{
      image1.style.transform='perspective(1000px) rotateY(0deg)'
     }
     let image3=this.threeDImg3.nativeElement as HTMLImageElement
     let image3Val=50-(window.scrollY-1300)/5;
    if(image3Val>0){
      image3.style.transform=`perspective(1000px) rotateY(${image3Val}deg)`
     }
      else{
        image3.style.transform='perspective(1000px)rotateY(0deg)'
     }
    }

  }

}
