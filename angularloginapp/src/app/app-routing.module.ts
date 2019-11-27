import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth-guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterComponent } from './register/register.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path : '', redirectTo : '/login', pathMatch:'full'},
  {path : 'login', component : LoginComponent},
  {path : 'home', component : HomeComponent, canActivate: [AuthGuard]},
  {path : 'forgotPassword', component : ForgotpasswordComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'addEmployee', component : AddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[HomeComponent, LoginComponent, ForgotpasswordComponent, RegisterComponent, AddComponent]; 
