import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Grid1Component } from './grid1/grid1.component';
import { Grid2Component } from './grid2/grid2.component';
import { Grid3Component } from './grid3/grid3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MininavComponent } from './mininav/mininav.component';
import { OverviewComponent } from './overview/overview.component';
import { DataComponent } from './data/data.component';
import { TableComponent } from './table/table.component';
import { NameService } from './name.service';
import { ReactiveFormsModule } from '@angular/forms';
// import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { OtpComponent } from './otp/otp.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './header/header.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { UniqueMeternameValidatorDirective } from './unique-metername-validator.directive';
import { UniqueCompanynameValidatorDirective } from './unique-companyname-validator.directive';
import { UniqueEmailValidatorDirective } from './unique-email-validator.directive';
import { LoaderService } from './services/loader.service';
import { HttpService } from './Shared/http.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ParameterValidatorDirective } from './parameter-validator.directive';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ReportcomponentComponent } from './reportcomponent/reportcomponent.component';

import { Bar3Component } from './bar3/bar3.component';

import { Bar5Component } from './bar5/bar5.component';
import { Line2Component } from './line2/line2.component';
import { ChartsModule } from 'ng2-charts';
import { SignupComponent } from './signup/signup.component';
import { SignuponeComponent } from './signupOne/signupOne.component';
import { SignuptwoComponent } from './signupTwo/signupTwo.component';
import { forgotPasswordOne } from './forgotPasswordOne/forgotPasswordOne.component';
import { forgotPasswordTwo } from './forgotPasswordTwo/forgotPasswordTwo.component';
import { forgotPasswordThree } from './forgotPasswordThree/forgotPasswordThree.component';
import { SortweekComponent } from './sortweek/sortweek.component';
import { GraphsComponent } from './graphs/graphs.component';
import { SortBarComponent } from './sort-bar/sort-bar.component';
import { SortLineComponent } from './sort-line/sort-line.component';
import { PieComponent } from './pie/pie.component';
import { ErrorgraphComponent } from './errorgraph/errorgraph.component';
import { ErrorGraphComponent } from './error-graph/error-graph.component';
import {CanvasJSChart} from '../app/canvasJs/canvasjs.angular.component';
import { VlVnKwComponent } from './vl-vn-kw/vl-vn-kw.component';
import { OverviewLineComponent } from './overview-line/overview-line.component';

// Important
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokeninterceptorInterceptor } from './tokeninterceptor.interceptor'
// import zoomPlugin from 'chartjs-plugin-zoom';
// import { Chart } from 'chart.js';
// Chart.register(zoomPlugin);

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    ParentComponent,
    NavbarComponent,
    Grid1Component,
    Grid2Component,
    Grid3Component,
    MininavComponent,
    OverviewComponent,
    DataComponent,
    TableComponent,
    LoginComponent,    
    HeaderComponent,
    DialogboxComponent,
    UniqueMeternameValidatorDirective,
    UniqueCompanynameValidatorDirective,
    UniqueEmailValidatorDirective,
    ParameterValidatorDirective,
    ReportcomponentComponent,
    Bar3Component,
    Bar5Component,
    Line2Component,
    SignupComponent,
    SignuponeComponent,
    SignuptwoComponent,
    forgotPasswordOne,
    forgotPasswordTwo,
    forgotPasswordThree,
    SortweekComponent,
    GraphsComponent,
    SortBarComponent,
    SortLineComponent,
    PieComponent,
    ErrorgraphComponent,
    ErrorGraphComponent,
    VlVnKwComponent,
    OverviewLineComponent,
  
   
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule

  ],

  providers: [
    NameService,
    LoaderService,
    HttpService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //   useClass:TokeninterceptorInterceptor,
  //   multi: true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule {

}
