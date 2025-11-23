import { Routes,Route } from '@angular/router';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { title } from 'process';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./home/home.component").then(m => m.HomeComponent),
        title: "Landing page",
        canActivate: [authGuard],
        data:{
            title:"Landing page",
            description:'This is landing page useful for view all the available products',
            image:'',
            
        }
    },
    {
        path: 'products',
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Products page",
        canActivate: [authGuard],
    },
    // {
    //     path:"products/:productFamily",
    //     loadComponent: () => import("../app/product/product.component").then(m => m.ProductComponent),
    //     title:"Product Page",
    // },
        {
        path:"products/wears",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title:"Product Page",
    },
            {
        path:"products/gadgets",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title:"Product Page",
    },
        {
        path:"products/asthetics",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title:"Product Page",
    },
            {
        path:"products/utensils",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title:"Product Page",
    },
            {
        path:"products/groceries",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title:"Product Page",
    },
    {
        path: 'orders',
        loadComponent: () => import("./order/order.component").then(m => m.OrderComponent),
        title: "Orders page",
        canActivate: [authGuard]
    },
    {
        path: 'chatbot',
        loadComponent: () => import("./chatbot/chatbot.component").then(m=>m.ChatbotComponent),
        title: "Orders page",
        canActivate: [authGuard]
    },
    {
        path: 'place-order',
        loadComponent: () => import("./place-order/place-order.component").then(m => m.PlaceOrderComponent),
        title: "Place Order",
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        loadComponent: () => import("./cart/cart.component").then(m => m.CartComponent),
        title: 'Cart Page',
        canActivate: [authGuard]
    },
    {
        path: 'log-in',
        loadComponent: () => import("./log-in/log-in.component").then(s => s.LogInComponent),
        title: "Login Page"
    },
    {
        path: 'register',
        loadComponent: () => import("./register/register.component").then(s => s.RegisterComponent),
        title: "Register Page"
    },
    {
        path: "admin",
        loadComponent: () => import("./admin-folder/admin/admin.component").then(s => s.AdminComponent),
        title: "Admin Page",
        canActivate: [adminGuard]
    },
    {
        path: "admin/upload",
        loadComponent: () => import("./admin-folder/admin-upload/admin-upload.component").then(s => s.AdminUploadComponent),
        title: "Upload Page",
        canActivate: [adminGuard],

    },
    {
        path: "track-order",
        loadComponent: () => import("./track-order/track-order.component").then(s => s.TrackOrderComponent),
        title: "Track Order",
        canActivate: [authGuard]
    }
];
