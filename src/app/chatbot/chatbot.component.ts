import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormsModule } from '@angular/forms';
import { SharedataService } from '../sharedata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule,CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {
  constructor(private apiService:ApiserviceService,private sharedData:SharedataService){

  }
  ngOnInit(): void {

  }
  text:any='';
  chatList:any=[];
  sendText=()=>{
    let chat=document.getElementById('chat');
     let obj={
      user:'client',
      msg:this.text
     };
     this.chatList.push(obj);
      // chat?.scrollTo(0,document.documentElement.scrollHeight);
     this.sharedData.loader.set(true);
      this.apiService.chatbotService(this.text).subscribe((res:any)=>{
        this.text=''
        this.sharedData.loader.set(false);
        let final={
          user:'server',
          msg:res.responseText
        };
        this.chatList.push(final);
        console.log(this.chatList,"hiii");
        setTimeout(()=>{
           chat?.scrollTo(0,chat.scrollHeight);
      },500)
      },er=>{
        this.sharedData.loader.set(false);
      });
  }
}
