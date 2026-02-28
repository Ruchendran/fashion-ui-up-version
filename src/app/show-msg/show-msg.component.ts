import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-msg',
  imports: [CommonModule],
  templateUrl: './show-msg.component.html',
  styleUrl: './show-msg.component.scss'
})
export class ShowMsgComponent {
  @Input('msgText') msgText='';
  @Input('msgType') msgType='';
}
