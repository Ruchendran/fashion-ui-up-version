import { Routes } from '@angular/router';
import { AdminComponent } from './admin-folder/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminUploadComponent } from './admin-folder/admin-upload/admin-upload.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { TrackOrderComponent } from './track-order/track-order.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:"Landing page"
    },
    {
        path:'products',component:ProductComponent,
        title:"Products page"
    },
    {
        path:'orders',component:OrderComponent,
        title:"Orders page"
    },
    {
        path:'place-order', component:PlaceOrderComponent,
        title:"Place Order"  
    },
    {
        path:'cart',component:CartComponent,
        title:'Cart Page'
    },
    {
        path:'log-in',component:LogInComponent,
        title:"Login Page"
    },
    {
        path:'register',component:RegisterComponent,
        title:"Register Page"
    },
    {
        path:"admin",
        component:AdminComponent,
        title:"Admin Page"
    },
    {
        path:'admin/upload',component:AdminUploadComponent,
        title:"Upload Page"
    },
    {
        path:"track-order",component:TrackOrderComponent,
        title:"Track Order"
    }
];
