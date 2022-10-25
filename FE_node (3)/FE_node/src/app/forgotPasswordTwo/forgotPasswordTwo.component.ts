import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-forgotpasswordtwo',
  templateUrl: './forgotPasswordTwo.component.html',
})
export class forgotPasswordTwo implements OnInit {

  constructor(private service: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  errormsg: any
  getEmail: any
  errormsgshow = false
  data: any

  enter_otp_permission = true
  enter_password_permission = false

  forgotPasswordTwoForm = new FormGroup({
    otp_entered: new FormControl('', Validators.required),
    recovery_email: new FormControl('', Validators.required),
    
  })

  // forgotPasswordThreeForm = new FormGroup({
  //   password: new FormControl('', Validators.required),
  //   cpassword: new FormControl('', Validators.required)
  // })



  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      console.log(params.getEmail)
      this.getEmail = params.getEmail
    })
  }



  forgotPasswordTwoSubmit() {


    if (this.forgotPasswordTwoForm.valid) {
      // console.log(this.forgotPasswordTwoForm.value, '<----  value of forgotPasswordTwoForm')
      this.service.forgotPasswordTwo(this.forgotPasswordTwoForm.value).subscribe((res) => {
        if (res.status == true) {

          this.errormsg = res.msg
          this.errormsgshow = true
          // this.getEmail = res.data.email
          let bytes  = CryptoJS.AES.decrypt(res.data, 'senselive');
           let key = bytes.toString(CryptoJS.enc.Utf8);
           this.getEmail = JSON.parse(key).email


          
          this.router.navigate(['forgotpasswordthree'], {queryParams:{getEmail:this.getEmail}})
          
        
        } else {
          this.errormsg = res.msg
          this.errormsgshow = true
          console.log("<<---- No Response")

        }
      })

    }

    }




   



  }
