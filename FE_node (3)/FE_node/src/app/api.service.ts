import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as common from './baseurl';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: any;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }
  userlogin(loginData: any) {
    return this.httpClient.post<any>(common.endpoint + '/Login.php', loginData)
      .pipe(map(Company => {
        this.setToken(Company[0].name);
        this.getLoggedInName.emit(true);
        return Company;
      }));
  }
  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
}
