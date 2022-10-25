import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ApiserviceService } from '../apiservice.service';
import { SharedService } from '../shared.service';
import * as CryptoJS from 'crypto-js';

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
  constructor(private service:ApiserviceService, private router:Router, private apiService: ApiService, private shared: SharedService) { }


  errormsg: any;
  errormsgshow= false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
// this.service.tableData().subscribe((res)=>{
//   console.log("tabledata service is called");
// })

  }

  invalidLogin: boolean = false;
  message: any;
  loginvar:string="out";
  logindata:any
  loginSubmit(){
    if(this.loginForm.valid){
      


// backend yet to start
      this.service.login(this.loginForm.value).subscribe((res)=>{

// backend end
        // console.log(res, "response data")
        
        
        let data = res.response
        // console.log(data, "MAIN response data")
        if(res.status == true){   
            

            let bytes_one  = CryptoJS.AES.decrypt(res.token, 'senselive');
            let token_key = bytes_one.toString(CryptoJS.enc.Utf8);
            let bytes  = CryptoJS.AES.decrypt(res.result, 'senselive');
            let key = bytes.toString(CryptoJS.enc.Utf8);

          
          localStorage.setItem('token', token_key)
          




            // localStorage.setItem('username', res.result.Name)


            // *********************************
            // console.log(data, "<---- data response")
          this.loginvar="in";
          window.sessionStorage.setItem('modalwork',JSON.stringify(this.loginvar));
          
          this.shared.onLoginArray(data);
          var data1 = data.CompanyName;
          var Name = data.Name;
          var Designation = data.Designation;
          var Email = data.Email;
          var Address = data.Address;
          var ColdStorage = data.ColdStorage;
          var Energy = data.Energy;
          var MobileNo = data.MobileNo;
          // const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/dashboard';
          // this.router.navigate([redirect]);
          // var user_id = data.map((t: { TempId: any; }) => t.TempId);
          // this.shared.onLogin(data1);
          window.sessionStorage.setItem('userdata', JSON.stringify(data1));
          window.sessionStorage.setItem('Name', JSON.stringify(Name)); 
          window.sessionStorage.setItem('Designation', JSON.stringify(Designation)); 
          window.sessionStorage.setItem('Email', JSON.stringify(Email));
          window.sessionStorage.setItem('MobileNo', JSON.stringify(MobileNo));  
          window.sessionStorage.setItem('Address', JSON.stringify(Address)); 
          window.sessionStorage.setItem('ColdStorage', JSON.stringify(ColdStorage)); 
          window.sessionStorage.setItem('Energy', JSON.stringify(Energy)); 
          // window.sessionStorage.setItem('user_id', JSON.stringify(user_id));

            // *********************************
           
            this.router.navigate(['/dashboard'])
            .then(()=>{
              // window.location.reload();

            })
        }else{

          console.log("Error login")
          this.errormsgshow = true
          this.errormsg = res.msg
        }
      })



    }else{
      this.errormsgshow =true;
      this.errormsg = "All fields are required!"
    }
  }



}


