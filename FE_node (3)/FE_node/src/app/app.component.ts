import { Component,ViewEncapsulation } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    
  title = 'EDM';
  loginbtn: boolean;
  isShown: boolean = false;
  constructor(private apiService: ApiService) {
    apiService.getLoggedInName.subscribe((name: any) => this.changeName(name));
    if (this.apiService.isLoggedIn()) {
      console.log("loggedin");
      this.loginbtn = false;
    }
    else {
      this.loginbtn = true;
    }
  }
  private changeName(name: boolean): void {
    this.loginbtn = !name;
  }

  ngOnInit() {

  }
}
