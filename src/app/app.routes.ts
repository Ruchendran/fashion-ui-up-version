import { Routes, Route } from '@angular/router';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { title } from 'process';
import { seoResolver } from './seo.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./home/home.component").then(m => m.HomeComponent),
        title: "Landing page",
        canActivate: [authGuard],
        data: {
            title: "Shop the Latest Fashion & Essentials",
            description: 'Discover thousands of products from the best brands. Shop exclusive collections, get fast shipping, and enjoy easy returns. Start saving today!',
            image: '',
        },
        resolve:{
            seoData:seoResolver
        }
    },
    {
        path: 'products',
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Products page",
        canActivate: [authGuard],
        data: {
            title: "New Arrivals & Best Sellers",
            description: 'Browse our curated collection of [Category Name]. Find the perfect style, compare prices, and read verified reviews. Free shipping on orders over $50!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    // {
    //     path:"products/:productFamily",
    //     loadComponent: () => import("../app/product/product.component").then(m => m.ProductComponent),
    //     title:"Product Page",
    // },
    {
        path: "products/wears",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Product Page",
        data: {
            title: "New Arrivals & Best Sellers",
            description: 'Browse our curated collection of [Category Name]. Find the perfect style, compare prices, and read verified reviews. Free shipping on orders over $50!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: "products/gadgets",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Product Page",
        data: {
            title: "New Arrivals & Best Sellers",
            description: 'Browse our curated collection of [Category Name]. Find the perfect style, compare prices, and read verified reviews. Free shipping on orders over $50!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: "products/asthetics",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Product Page",
        data: {
            title: "New Arrivals & Best Sellers",
            description: 'Browse our curated collection of [Category Name]. Find the perfect style, compare prices, and read verified reviews. Free shipping on orders over $50!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: "products/utensils",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Product Page",
        data: {
            title: "New Arrivals & Best Sellers",
            description: 'Browse our curated collection of [Category Name]. Find the perfect style, compare prices, and read verified reviews. Free shipping on orders over $50!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: "products/groceries",
        loadComponent: () => import("./product/product.component").then(m => m.ProductComponent),
        title: "Product Page",
        data: {
            title: "New Arrivals & Best Sellers",
            description: 'Browse our curated collection of [Category Name]. Find the perfect style, compare prices, and read verified reviews. Free shipping on orders over $50!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: 'orders',
        loadComponent: () => import("./order/order.component").then(m => m.OrderComponent),
        title: "Orders page",
        canActivate: [authGuard],
        data: {
            title: "Success! Your Order #[Order ID] is Confirmed!",
            description: 'Your order is official! Get ready to enjoy your new items. You can check the details or share the good news!',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: 'chatbot',
        loadComponent: () => import("./chatbot/chatbot.component").then(m => m.ChatbotComponent),
        title: "Orders page",
        canActivate: [authGuard],
        data: {
            title: "",
            description: '',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: 'place-order',
        loadComponent: () => import("./place-order/place-order.component").then(m => m.PlaceOrderComponent),
        title: "Place Order",
        canActivate: [authGuard],
        data: {
            title: "Secure Checkout - Finalize Your Order",
            description: 'Complete your purchase quickly and securely. We accept all major cards and offer trusted payment protection.',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: 'cart',
        loadComponent: () => import("./cart/cart.component").then(m => m.CartComponent),
        title: 'Cart Page',
        canActivate: [authGuard],
        data: {
            title: "Your Shopping Cart: Ready to Check Out?",
            description: 'Dont miss out! Your items are waiting. Complete your order now to secure your purchases and get free express shipping.',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: 'sign-in',
        loadComponent: () => import("./log-in/log-in.component").then(s => s.LogInComponent),
        title: "Login Page",
        data: {
            title: "",
            description: '',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: "admin",
        loadComponent: () => import("./admin-folder/admin/admin.component").then(s => s.AdminComponent),
        title: "Admin Page",
        canActivate: [adminGuard],
        data: {
            title: "",
            description: '',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    },
    {
        path: "admin/upload",
        loadComponent: () => import("./admin-folder/admin-upload/admin-upload.component").then(s => s.AdminUploadComponent),
        title: "Upload Page",
        canActivate: [adminGuard],
        data: {
            title: "",
            description: '',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }

    },
    {
        path: "track-order",
        loadComponent: () => import("./track-order/track-order.component").then(s => s.TrackOrderComponent),
        title: "Track Order",
        canActivate: [authGuard],
        data: {
            title: "Track Your Order - ID #[Order ID]",
            description: 'Follow your package every step of the way! See the latest status and estimated delivery time for your order from [Your Brand Name].',
            image: '',
        },
                resolve:{
            seoData:seoResolver
        }
    }
];
