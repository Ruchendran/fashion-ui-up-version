import { Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { serverVal } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService implements OnInit {

  constructor(private http:HttpClient) { }

  apiConstants={
    registerUser:serverVal.server+'/auth/register',
    loginUser:serverVal.server+'/auth/login'
  }

  ngOnInit(): void {
      
  }

  adminUpload(data: any): Observable<any> {
    return this.http.post(serverVal.server+"/admin/upload", data);  // POST request
  }

  registerUser(data:any){
    return this.http.post(this.apiConstants.registerUser,data);
  }
  loginUser(data:any){
    console.log("hit");
    return this.http.post(this.apiConstants.loginUser,data);
  }
}
