import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import {redirectUnauthorizedTo, redirectLoggedInTo,AngularFireAuthGuard} from "@angular/fire/compat/auth-guard"
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const redirectUnauthorizedToLogin = () =>redirectUnauthorizedTo(['/signin'])
const redirectLoggedInToHome = ()=> redirectLoggedInTo([''])

const routes: Routes = [
  {
    path:"signin",
    component:SigninComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectLoggedInToHome}
  },
  {
    path:"signup",
    component:SignupComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectLoggedInToHome}
  },
  {
    path:"addpost",
    component:AddpostComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path:"",
    component:HomeComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path:"**",
    component:PagenotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
