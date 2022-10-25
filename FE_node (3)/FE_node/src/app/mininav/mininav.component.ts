import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-mininav',
  templateUrl: './mininav.component.html',
  styleUrls: ['./mininav.component.css']
})
export class MininavComponent implements OnInit {
  active: any;
  disabled = true;
value:any;
decide2:any;
showModal1: boolean|any;
  showModal2: boolean|any;
  m_id: any;
  card: any;
  cardService: any;
  data: any;
  KW: any;
  triggerval: any;
  c: any;
  cname: any=[];
  triggerval2: any;
  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.value=JSON.parse(window.sessionStorage.getItem('userdata')||'{}');
    this.decide2=JSON.parse(window.sessionStorage.getItem('length')||'{}');

    
      this.cname=JSON.stringify(this.value);
      this.data=JSON.parse(this.cname);
      // console.log("value--->",this.data)
      
    
  }
  logclick(){
    if(this.decide2==0){
      this.showModal1 = true;
     
    }else if(this.decide2>0){
      this.showModal2 = true;
     
    }
  }
  hide1()
  { 
    this.showModal1 = false;
  }
  hide2()
  { 
    this.showModal2 = false;
  }
 
  register(esend: any) {
    throw new Error('Method not implemented.');
  }
  esend(esend: any) {
    throw new Error('Method not implemented.');
  }
}
