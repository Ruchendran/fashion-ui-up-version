import { Routes } from '@angular/router';
import { AdminComponent } from './admin-folder/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminUploadComponent } from './admin-folder/admin-upload/admin-upload.component';
import { ProductComponent } from './product/product.component';
import { TrendingComponent } from './trending/trending.component';
import { CartComponent } from './cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'products',component:ProductComponent
    },
    {
        path:'trending',component:TrendingComponent
    },
    {
        path:'cart',component:CartComponent
    },
    {
        path:'log-in',component:LogInComponent
    },
    {
        path:'register',component:RegisterComponent
    },
    {
        path:"admin",
        component:AdminComponent
    },
    {
        path:'admin/upload',component:AdminUploadComponent
    }
];
