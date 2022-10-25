import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';

import { ParentComponent } from './parent/parent.component';
import { OverviewComponent } from './overview/overview.component';
import { DataComponent } from './data/data.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'otp', component: OtpComponent },
 
  {
    path: 'dashboard', component: ParentComponent, canActivate:[AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'data', component: DataComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
