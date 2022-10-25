import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-signupOne',
  templateUrl: './signupOne.component.html',
})
export class SignuponeComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: Router) { }

  errormsg: any
  getEmail: any
  email: any
  randomNum: any
  errormsgshow = false
  data: any

  verifyForm = new FormGroup({
    email: new FormControl('', Validators.required)
  })

  ngOnInit(): void {

  }




  verifySubmit() {


    if(this.verifyForm.valid){
      // console.log(this.verifyForm.value, '<----  value of login form')
      this.service.signupOne(this.verifyForm.value).subscribe((res)=>{
        if(res.status == true){
            // console.log(res, "<---  Mail sent successfully")
  
            let bytes  = CryptoJS.AES.decrypt(res.data, 'senselive');
            let key = bytes.toString(CryptoJS.enc.Utf8);
            this.getEmail = JSON.parse(key).email
            // console.log(key, "<---  email")
            // console.log(this.getEmail, "<---  email")

            // this.getEmail = res.data.email
            // console.log(res.data.randomNum, "<---  randomNum")
            this.router.navigate(['signuptwo'], {queryParams:{getEmail: this.getEmail}})

          }
      })
    }else{
      this.errormsgshow =true;
      this.errormsg = "Enter valid Email!"
    }


  }

}
