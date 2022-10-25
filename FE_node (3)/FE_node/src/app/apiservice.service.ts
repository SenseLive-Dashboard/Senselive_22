import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:3000/api"
  // apiUrl = "http://backend-alb-1643516075.ap-south-1.elb.amazonaws.com/api"

  // signup
  signup(data:any):Observable<any>{

    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive2').toString();
    // res.json(TOKEN);this.loginForm.value
    // console.log("encrypted_data   ", encrypted_data)
    let send={
     data: encrypted_data
  }

    // console.log(data, "<---  signup data")
    return this.http.post(`${this.apiUrl}/signup`, send)
  }

  
  // login
  login(data:any):Observable<any>{
    // console.log(data, "<---  login data")
    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive2').toString();
      // res.json(TOKEN);this.loginForm.value
      // console.log("encrypted_data   ", encrypted_data)
      let send={
       data: encrypted_data
    }

    return this.http.post(`${this.apiUrl}/login`, send)
  }

  // Dashboard
  dashboard():Observable<any>{
    return this.http.get(`${this.apiUrl}/dashboard`)

  }

  // get token
  getToken(){
    // console.log("get token service",  localStorage.getItem('token'))
    return localStorage.getItem('token')
  }


  
  // signup One
  signupOne(email:any):Observable<any>{
    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(email), 'senselive2').toString();
    // console.log("This is ApiService Email", email)
    let send={
      email:encrypted_data
    }
    return this.http.post(`${this.apiUrl}/signupone`, send)
  }

  // signup Two
  signupTwo(otp:any):Observable<any>{
    // console.log("This is ApiService otp", otp)
    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(otp), 'senselive2').toString();
    let send={
      data:encrypted_data
    }
    return this.http.post(`${this.apiUrl}/signuptwo`, send)
  }

  aaa(email:any):Observable<any>{
    // console.log("This is ApiService Email", email)
    return this.http.post(`${this.apiUrl}/signupone`, email)
  }

  // forgotPassword One
  forgotPasswordOne(email:any):Observable<any>{
    // console.log("This is ApiService email", email)
    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(email), 'senselive2').toString();
    let send={
      email:encrypted_data
    }
    return this.http.post(`${this.apiUrl}/forgotPasswordOne`, send)
  }


  // forgotPassword Two
  forgotPasswordTwo(otp:any):Observable<any>{
    // console.log("This is ApiService recovery otp", otp)
    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(otp), 'senselive2').toString();
    let send={
      data:encrypted_data
    }
    return this.http.post(`${this.apiUrl}/forgotPasswordTwo`, send)
  }


  // forgotPassword Three
  forgotPasswordThree(pass_body:any):Observable<any>{
    // console.log("This is ApiService recovery otp", pass_body)
    let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(pass_body), 'senselive2').toString();
    let send={
      data:encrypted_data
    }
    return this.http.post(`${this.apiUrl}/forgotPasswordThree`, send)
  }

  // tableData
  tableData():Observable<any>{
    // console.log("This is the content of tableData()")
    return this.http.get(`${this.apiUrl}/tableData`)

  }

}
