import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // <!-- Property declaration -->
fieldTextType: boolean | any;

// <!-- Switching method -->
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
  invalidLogin: boolean = false;
  message: any;
  loginvar:string="out";

  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, private shared: SharedService, private router: Router) {

  }
  //send login data and redirectUrl to dashboard

  ngOnInit(): void {
  }

  onSubmit() {

    const loginData = {
      Email: this.loginForm.controls.Email.value,
      Password: this.loginForm.controls.Password.value
    };

    this.apiService.userlogin(loginData).pipe(first())
      .subscribe(
        data => {

          console.log(typeof(data), "<---- data response")
          this.loginvar="in";
          window.sessionStorage.setItem('modalwork',JSON.stringify(this.loginvar));
          const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/dashboard';
          this.router.navigate([redirect]);
          this.shared.onLoginArray(data);
          var data1 = data.map((t: { CompanyName: any; }) => t.CompanyName);
          var Name = data.map((t: { Name: any; })=>t.Name);
          var Designation = data.map((t: { Designation: any; })=>t.Designation);
          var Email = data.map((t: { Email: any; })=>t.Email);
          var Address = data.map((t: { Address: any; })=>t.Address);
          var ColdStorage = data.map((t: { ColdStorage: any; })=>t.ColdStorage);
          var Energy = data.map((t: { Energy: any; })=>t.Energy);
          var MobileNo = data.map((t: { MobileNo: any; })=>t.MobileNo);
          // var user_id = data.map((t: { TempId: any; }) => t.TempId);
          //this.shared.onLogin(data1);
          window.sessionStorage.setItem('userdata', JSON.stringify(data1));
          window.sessionStorage.setItem('Name', JSON.stringify(Name)); 
          window.sessionStorage.setItem('Designation', JSON.stringify(Designation)); 
          window.sessionStorage.setItem('Email', JSON.stringify(Email));
          window.sessionStorage.setItem('MobileNo', JSON.stringify(MobileNo));  
          window.sessionStorage.setItem('Address', JSON.stringify(Address)); 
          window.sessionStorage.setItem('ColdStorage', JSON.stringify(ColdStorage)); 
          window.sessionStorage.setItem('Energy', JSON.stringify(Energy)); 
          // window.sessionStorage.setItem('user_id', JSON.stringify(user_id));

        },
        _error => {
          alert("Email or password is incorrect")
        });



  }
  get email() { return this.loginForm.get('Email'); }
  get password() { return this.loginForm.get('Password'); }

}