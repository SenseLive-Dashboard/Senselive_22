import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-forgotpasswordone',
  templateUrl: './forgotPasswordOne.component.html',
})
export class forgotPasswordOne implements OnInit {

  constructor(private service: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  errormsg: any
  getEmail: any
  email: any
  randomNum: any
  errormsgshow = false
  data: any

  

  forgotPasswordOneForm = new FormGroup({
    email: new FormControl('', Validators.required)
  })

  ngOnInit(): void {


  }




  forgotPasswordOneComponentSubmit() {


    if(this.forgotPasswordOneForm.valid){
      // console.log(this.forgotPasswordOneForm.value, '<----  value of forgotPasswordOneForm form')
      this.service.forgotPasswordOne(this.forgotPasswordOneForm.value).subscribe((res)=>{
        if(res.status == true){

            this.errormsgshow = true,
            this.errormsg = res.msg
            // console.log(res, "<---  Mail sent successfully")
           
            // console.log("response   ", res)
            // console.log("response encrypted data  ", res.data)

           let bytes  = CryptoJS.AES.decrypt(res.data, 'senselive');
           let key = bytes.toString(CryptoJS.enc.Utf8);
            // console.log("bytes   ", bytes)

            //   console.log("decrypted key   ", key)
            //   console.log("decrypted key   ", JSON.parse(key))
              this.getEmail = JSON.parse(key).email
            
            // console.log(res.data.email, "<---  res.data.email")
            this.router.navigate(['forgotpasswordtwo'], {queryParams:{getEmail:this.getEmail}})

          }else{
            this.errormsgshow = true,
            this.errormsg = res.msg
          }
      })
    }else{
      this.errormsgshow =true;
      this.errormsg = "Enter valid Email!"
    }


  }

}
