import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: Router, private route: ActivatedRoute ) { }
  errormsg: any;
  errormsgshow = false;
  getEmail: any


  signupForm = new FormGroup({
    // name: new FormControl('', Validators.required),
    // email: new FormControl(''),
    // password: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required,),
    mobile_no: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    coldstorage: new FormControl('', Validators.required),
    energy: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      // console.log("params.getEmail", params.getEmail)
      this.getEmail = params.getEmail
    })

  }

  signupSubmit() {

    if (this.signupForm.valid) {
      // console.log(this.signupForm.value, ' <<-----  signupform')
      this.errormsgshow = false;

      // call Api
      this.service.signup(this.signupForm.value).subscribe((res) => {
        // console.log(res, "<---- signup response")
        if (res.status == true) {
          
          this.router.navigate(['login']);
        } else {
          this.errormsgshow = true;
          this.errormsg = res.errormsg;
          console.log(this.errormsg, "email error")
        }

      })

    } else {
      this.errormsgshow = true;
      this.errormsg = "All fields are required!"
    }

  }


}
