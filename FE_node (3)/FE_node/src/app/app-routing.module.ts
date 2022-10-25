import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';


import { ParentComponent } from './parent/parent.component';
import { OverviewComponent } from './overview/overview.component';
import { DataComponent } from './data/data.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { SignuponeComponent } from './signupOne/signupOne.component';
import { SignuptwoComponent } from './signupTwo/signupTwo.component';
import { forgotPasswordTwo } from './forgotPasswordTwo/forgotPasswordTwo.component';
import { forgotPasswordThree } from './forgotPasswordThree/forgotPasswordThree.component';
import { forgotPasswordOne } from './forgotPasswordOne/forgotPasswordOne.component';
import { TableComponent } from './table/table.component';
import { ReportcomponentComponent } from './reportcomponent/reportcomponent.component';
import { GraphsComponent } from './graphs/graphs.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'register', component: RegistrationFormComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'forgotpassword', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },
  // { path: 'otp', component: OtpComponent },

  
//  *************
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
// {path: 'dashboard', component: DashboardComponent},
{path: 'signupone', component: SignuponeComponent},
{path: 'signuptwo', component: SignuptwoComponent},
{path: 'forgotpasswordone', component: forgotPasswordOne},
{path: 'forgotpasswordtwo', component: forgotPasswordTwo},
{path: 'forgotpasswordthree', component: forgotPasswordThree},



// ***************





  {
    path: 'dashboard', component: OverviewComponent, canActivate:[AuthGuard],
    children: [
      { path: 'overview1', component: OverviewComponent },
      { path: 'data', component: DataComponent },
      { path: 'analysis', component: GraphsComponent  }
    ]
  },
  {path: 'overview1', component: OverviewComponent},
  {path: 'data1', component: TableComponent},
  //{path: 'report', component:ReportcomponentComponent },
  {path: 'analysis', component: GraphsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[OverviewComponent,DataComponent];


