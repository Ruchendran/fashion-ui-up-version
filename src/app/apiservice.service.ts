import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverVal } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService implements OnInit {

  constructor(private http:HttpClient) { }


  ngOnInit(): void {
      
  }

  adminUpload(data: any): Observable<any> {
    return this.http.post(serverVal.server+"/admin/upload", data);  // POST request
  }

  
}
