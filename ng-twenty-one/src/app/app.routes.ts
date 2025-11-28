import { Routes } from '@angular/router';
import { MyWork } from './ux/components/my-work/my-work';
import { AboutThisApp } from './ux/components/about-this-app/about-this-app';

export const routes: Routes = [
    { path: '', component: MyWork },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'about', component: AboutThisApp },
];
