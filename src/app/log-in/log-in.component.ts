import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  eyeOpen=false;
  onClickeye(){
    console.log("hit")
    this.eyeOpen=!this.eyeOpen;
  }
}
