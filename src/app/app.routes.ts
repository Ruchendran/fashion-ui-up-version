import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import path from 'path';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("../app/home/home.component").then(m => m.HomeComponent),
        title: "Landing page",
        canActivate: [authGuard]
    },
    {
        path: 'products',
        loadComponent: () => import("../app/product/product.component").then(m => m.ProductComponent),
        title: "Products page",
        canActivate: [authGuard],
        children:[
            {
                path:":productFamily",
                loadComponent: () => import("../app/product/product.component").then(m => m.ProductComponent),
                title:"Product Page"
            }
        ]
    },
    {
        path: 'orders',
        loadComponent: () => import("../app/order/order.component").then(m => m.OrderComponent),
        title: "Orders page",
        canActivate: [authGuard]
    },
    {
        path: 'place-order',
        loadComponent: () => import("../app/place-order/place-order.component").then(m => m.PlaceOrderComponent),
        title: "Place Order",
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        loadComponent: () => import("../app/cart/cart.component").then(m => m.CartComponent),
        title: 'Cart Page',
        canActivate: [authGuard]
    },
    {
        path: 'log-in',
        loadComponent: () => import("../app/log-in/log-in.component").then(s => s.LogInComponent),
        title: "Login Page"
    },
    {
        path: 'register',
        loadComponent: () => import("../app/register/register.component").then(s => s.RegisterComponent),
        title: "Register Page"
    },
    {
        path: "admin",
        loadComponent: () => import("../app/admin-folder/admin/admin.component").then(s => s.AdminComponent),
        title: "Admin Page"
    },
    {
        path: 'admin/upload',
        loadComponent: () => import("../app/admin-folder/admin-upload/admin-upload.component").then(s => s.AdminUploadComponent),
        title: "Upload Page"
    },
    {
        path: "track-order",
        loadComponent: () => import("../app/track-order/track-order.component").then(s => s.TrackOrderComponent),
        title: "Track Order",
        canActivate: [authGuard]
    }
];
