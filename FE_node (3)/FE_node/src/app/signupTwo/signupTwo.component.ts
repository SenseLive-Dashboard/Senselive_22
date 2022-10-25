import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';



@Component({
  selector: 'app-signupOne',
  templateUrl: './signupTwo.component.html',
})
export class SignuptwoComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: Router, private route: ActivatedRoute ) { }

  errormsg: any
  getEmail: any
  errormsgshow = false
  data: any

  otpForm = new FormGroup({
    otp_entered: new FormControl('', Validators.required),
    signup_email: new FormControl('', Validators.required),

  })

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      // console.log("params.getEmail", params.getEmail)
      this.getEmail = params.getEmail
    })

  }



  otpSubmit() {


    if (this.otpForm.valid) {
      // console.log(this.otpForm.value, '<----  value of otp form')
      this.service.signupTwo(this.otpForm.value).subscribe((res) => {
        if (res.status == true) {

          this.errormsgshow = true;
          this.errormsg = "OTP verified"
          // this.getEmail = res.email
          this.router.navigate(['signup'], {queryParams:{getEmail: this.getEmail}})
          
          // console.log(res, "<---  Response latest")
          // this.email = res.data.email
          // this.randomNum = res.data.ranndomNum
          // console.log(res.data.email, "<---  email")
          // console.log(res.data.randomNum, "<---  randomNum")

        } else {
          this.errormsgshow = true;
          this.errormsg = "Enter valid OTP!"
        }
      })

    }

    }

  }
