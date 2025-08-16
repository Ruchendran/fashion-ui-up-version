import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { RouterOutlet,RouterModule} from '@angular/router';
import { HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'fashion-ui';
  constructor(){

  }
  @ViewChild('signInHover') signInHover!:ElementRef;
  @HostListener('click',['$event'])
  onClick=(outOfHover:Event)=>{
    if(!this.signInHover.nativeElement.contains(outOfHover.target)){
      let signInHoverElement=document.getElementById('sign-in-hover');
      signInHoverElement?.classList.remove('sign-in-hover-label');
      signInHoverElement?.classList.add('sign-in-hover');
    }
  }
  ngOnInit(): void {
  
  }
  pointHover=()=>{
    let signInHoverElement=document.getElementById('sign-in-hover');
    signInHoverElement?.classList.add('sign-in-hover-label');
  }

}
