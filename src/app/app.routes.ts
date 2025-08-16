import { Routes } from '@angular/router';
import { AdminComponent } from './admin-folder/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminUploadComponent } from './admin-folder/admin-upload/admin-upload.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:"admin",
        component:AdminComponent
    },
    {
        path:'admin-upload',component:AdminUploadComponent
    }
];
