import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';
import * as common from './baseurl';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  apiUrl = "http://localhost:3000/api"
  // apiUrl = "http://backend-alb-1643516075.ap-south-1.elb.amazonaws.com/api"

  constructor(private httpClient: HttpClient) {  }
  getCompanyData(){
    // return this.httpClient.get<Company[]>(common.endpoint +'/Get_companydata.php').pipe(
    return this.httpClient.get<Company[]>(`${this.apiUrl}/getCompanyData`).pipe(
      map( Company => {
        const newCompany = [];
        for(let company of Company){
          const CompanyName = company.CompanyName;
          const Email = company.Email;
          newCompany.push({CompanyName: CompanyName, Email: Email});
        }
        return newCompany;
      }),
      tap(Company => console.log(Company))
    );
  }
  getDataByCompanyname(CompanyName:string){
    // return this.httpClient.get<Company[]>(common.endpoint +'/Unique_CompanyName.php?CompanyName='+CompanyName);
    return this.httpClient.get<Company[]>(`${this.apiUrl}/uniqueCompanyName/`+CompanyName);
  }
  getDataByEmail(Email:string){
    // return this.httpClient.get<Company[]>(common.endpoint +'/Unique_Email.php?Email='+Email);
    return this.httpClient.get<Company[]>(`${this.apiUrl}/uniqueEmail/`+Email);
  }
  registerCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(common.endpoint + '/Registration_company.php', company);
  }
  sendOTP(Email:string){
    return this.httpClient.get<any[]>(common.endpoint + '/OTP_sendOTP.php?Email='+Email);
  }
  resetpassword(set: Company): Observable<Company> {
    return this.httpClient.post<Company>(common.endpoint + '/Reset-password.php', set);
  }
  changePassword(email: any) {
    return this.httpClient.post(common.endpoint + '/Forgot-password.php', email);
  }
}
