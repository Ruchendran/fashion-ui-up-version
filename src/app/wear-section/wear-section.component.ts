import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wear-section',
  imports: [],
  templateUrl: './wear-section.component.html',
  styleUrl: './wear-section.component.scss'
})
export class WearSectionComponent {
  constructor(private route:Router){

  }
  navToProducts=(productFamily:String)=>{
    this.route.navigate([`/products/${productFamily}`])
  }
}
