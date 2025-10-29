import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-order',
  imports: [],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent implements OnInit {
  constructor(private activateRoute:ActivatedRoute){

  }
  orderId:any=null;
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((val:any)=>{
      this.orderId=val?.orderId;
    })
  }
}
