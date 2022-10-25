import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-forgotpasswordtwo',
  templateUrl: './forgotPasswordThree.component.html',
})
export class forgotPasswordThree implements OnInit {

  constructor(private service: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  errormsg: any
  getEmail: any
  errormsgshow = false
  data: any

  forgotPasswordThreeForm = new FormGroup({
    password: new FormControl('', Validators.required),
    cpassword: new FormControl('', Validators.required),
    recovery_email: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      // console.log("params.getEmail", params.getEmail)
      this.getEmail = params.getEmail
    })


  }



  forgotPasswordThreeSubmit() {


    if (this.forgotPasswordThreeForm.valid) {
      // console.log(this.forgotPasswordThreeForm.value, '<----  value of forgotPasswordTwoForm')
      this.service.forgotPasswordThree(this.forgotPasswordThreeForm.value).subscribe((res) => {
        if(res.status == true){

          this.errormsgshow = true,
          this.errormsg = res.msg
          let bytes  = CryptoJS.AES.decrypt(res.data, 'senselive');
           let key = bytes.toString(CryptoJS.enc.Utf8);
          // console.log(res, "<---  success")
          // this.email = res.data.email
          // this.randomNum = res.data.ranndomNum
          // console.log(res.data.email, "<---  email")
          // console.log(res.data.randomNum, "<---  randomNum")
          this.router.navigate(['login'])

        }else{
          // console.log(res, "<---  try again with experience")

          this.errormsgshow = true,
          this.errormsg = res.msg
        }
      })

    }

    }

  }
