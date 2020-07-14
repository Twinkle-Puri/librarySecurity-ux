import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibraryComponent } from './library/library.component';
import { BookFormComponent } from './book-form/book-form.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {LoginGuard} from './service/login.guard';
import {AuthGuard} from './service/auth.guard';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home'},
  {path:'home',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'lib',component:LibraryComponent,canActivate:[AuthGuard]},
  {path:'addBook',component:BookFormComponent,canActivate:[AuthGuard]},
  {path:'editBook/:id', component:BookFormComponent,canActivate:[AuthGuard]},
  {path:'book/:id',component:BookFormComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]}, 
  {path:'reg',component:RegistrationComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
