import { ComponentRef, Injectable, OnInit, signal, ViewContainerRef} from '@angular/core';
import { LoaderComponent } from './loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class SharedataService implements OnInit {
  
  constructor() { }
  logInUser=signal('');
  ngOnInit(): void {
  }
  setLogInUserVal=(user:string)=>{
    this.logInUser.set(user);
  }

  
}
