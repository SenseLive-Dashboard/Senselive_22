import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { CardService } from '../card.service';
import { Sensor } from '../sensorData';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-grid3',
  templateUrl: './grid3.component.html',
  styleUrls: ['./grid3.component.css']
})
export class Grid3Component implements OnInit {
  customClass: string = 'customClass';
  data: Sensor[] = [];
  value:any;
  m_id:string='';
  mySub!: Subscription;
  card: Subscription | any;
  
  constructor(private cardService: CardService,private shared: SharedService) {
    // this.value=JSON.parse(window.sessionStorage.getItem('userdata')||'{}');
   

    // this.cardService.get_meterCardData(this.value).subscribe((response) => {
    //   this.data = response;
    //   return this.data;
    // });
  }
 
  ngOnInit(): void {
    if (this.shared.subsVar == undefined) {
      console.log("accordianngonit");
      this.shared.subsVar = this.shared.invokeaccordianFunction.subscribe((meterid: string) => {
        this.mySub = interval(1000).subscribe((func=>{
          this.myFunctionaccordian(meterid);
        })) 
      });
    }
  }
  myFunctionaccordian(meterid: string) {
    console.log("accordian running");
    this.m_id = meterid;
    this.card =this.cardService.get_meterAccordianData(this.m_id).subscribe((response) => {
      this.data = response;
      return this.data;
    });
  }

}
