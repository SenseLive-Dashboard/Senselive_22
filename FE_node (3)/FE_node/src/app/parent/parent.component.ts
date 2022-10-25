
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Meter } from '../meterreg';
import { MeterregService } from '../meterreg.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  value:any;
  meter: Meter[]=[];

  
  errormsg: any
  errormsgshow = false
  data: any


  constructor(private shared:SharedService,private meterreg: MeterregService, private service: ApiserviceService){}
  ngOnInit() {
    
    this.value=JSON.parse(window.sessionStorage.getItem('userdata')||'{}');
    this.meterreg.addMeter(this.value).subscribe((response) => {
      this.meter = response;
      // console.log("PArent component called in service ***********************")
      // console.log("response",this.meter)
      window.sessionStorage.setItem('length',JSON.stringify(this.meter.length));
      this.decide1=JSON.parse(window.sessionStorage.getItem('modalwork')||'{}');
      this.decide2=JSON.parse(window.sessionStorage.getItem('length')||'{}');
      this.logclick();  
      return this.meter;
    });  


    // this.service.dashboard().subscribe((res)=>{
    //   // console.log(res, "<----  Dashboard response")

    //   if(res.status == false){
    //     // this.router.navigate([''])
    //     this.errormsgshow = true
    //     this.errormsg = "Access denied!"
    //   }else{
    //     // this.data = res.data
    //     // console.log(this.data, "<------  Dashboard data")
    //   }

    // })
    
  }

  logclick(){
    if(this.decide1=="in" && this.decide2==0){
      this.showModal1 = true;
     
    }else if(this.decide1=="in" && this.decide2>0){
      this.showModal2 = true;
     
    }
  }
  
  open:any
  openNav() {
    // if(this.open == true){
    //   this.closeNav()
    // }
    this.open = true
    console.log("open clicked!",this.open)
  }

  closeNav() {
    this.open = false
    console.log("close clicked!" ,this.open   )
  }

  showModal1: boolean|any;
  showModal2: boolean|any;
  decide1:any;
  decide2:any;
 
  hide1()
  { 
    this.showModal1 = false;
  }
  hide2()
  { 
    this.showModal2 = false;
  }
}
