import { Component, OnInit } from '@angular/core';
import { faFilter, faDownload, faSort } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
import * as XLSX from 'xlsx';
import { Sensor } from '../sensorData';
import { SharedService } from '../shared.service';
import { Meter } from '../meterreg';
import { MeterregService } from '../meterreg.service';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import * as CryptoJS from 'crypto-js';
// import { stringify } from 'querystring';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  data: Sensor[] = [];
  event_arr1:any;
  event_arr2: any;
  trigger_event1: boolean = false;
  trigger_event2: boolean = false;
  try: Sensor[] = [];
  m_id: string = ' ';
  companyName: string = ' ';
  Client: any; //searching variable filter
  Reading_Time: any;
  p: number = 1; //pagination variable
  faFilter = faFilter;
  faDownload = faDownload;
  faSort = faSort;
  fileName = "ExcelSheet.xlsx"; //download file 
  data1: Sensor[] = [];
  data2: Sensor[] = [];
  datepicker: boolean = false;
  value:any;
  meter:Meter[]=[];
  show1: boolean = false;
  mySub!: Subscription;
  b: any;
  ommiting: any;
  sample: any[]=[];
  checked_parameters: any=[];
  loader: boolean = false;

  constructor(private userService: UserService, private shared: SharedService,private meterreg: MeterregService) {
    this.userService.get_companyDrpdwn_data().subscribe((response) => {
      this.data1 = response;
      // console.log(this.data1,"drpdown")
      return this.data1;
    });

  }
  ngOnInit() {
   
    this.value = JSON.parse(window.sessionStorage.getItem('userdata') || '{}');

    this.meterreg.addMeter(this.value).subscribe((response) => {
      this.meter = response;
      // console.log(this.meter);
      return this.meter;
    });
  
    if (this.shared.subsVar3 == undefined) {
      this.shared.subsVar3 = this.shared.invokeupdateFunction.subscribe(() => {
        this.changename();
      });
    }
      
    if (this.shared.subsVar5 == undefined) {
      this.shared.subsVar5 = this.shared.invokegridFunction.subscribe(() => {
        this.addname();
      });
    }

  }

  loading(){
    this.loader = false;
    console.log("Loading function working....")
  }

  changename(){
    console.log("calledbygrid1");
    this.ngOnInit();
  }

  addname(){
    console.log("calledbynavbar");
    this.ngOnInit();
  }


  async getmeterId(event: any) {
    this.m_id = event.target.value;
    this.loader = true
    let response =await this.userService.sendidMeter(this.m_id);
    // console.log("response",response)
    let data_res=await response.text();
    
    let bytes  =  CryptoJS.AES.decrypt(data_res, 'senselive');
        let key = bytes.toString(CryptoJS.enc.Utf8);
        // console.log("data key",key)

// let data_res=await response.json();
    


    this.data=JSON.parse(key)
    this.data2 = JSON.parse(key)
    this.loading();
      // this.userService.sendidMeter(this.m_id).subscribe((response) => {
      //   this.data = response;
      //   this.data2 = response;
      //   return this.data;
      // });
    

  }
  // this.mySub = interval(1000).subscribe((func=>{
  // })) // code for realtime data in table


  async displayAllMeterData() {
    this.companyName = this.value ;

    let response =await this.userService.displayAllMeterData(this.companyName);
    let data_res=await response.json();
    this.data=data_res;
    // this.userService.displayAllMeterData(this.companyName).subscribe((response) => {
    //   this.data = response;
      this.data2 = data_res;
    //   return this.data;
    // });
  }



  /*-------------timestamp sort-----------*/
  live() {  // code for sorting live
      this.userService.get_liveData(this.m_id).subscribe((response) => {
        this.data = response;
        return this.data;
      });
  }//ends
  minute() {  // code for sorting according to minute
    this.userService.get_minuteData(this.m_id).subscribe((response) => {
      this.data = response;
      return this.data;
    });
  }//ends
  hour() {  // code for sorting according to hour
    this.userService.get_hourData(this.m_id).subscribe((response) => {
      this.data = response;
      return this.data;
    });
  }//ends
  day() {  // code for sorting according to day
    this.userService.get_dayData(this.m_id).subscribe((response) => {
      this.data = response;
      return this.data;
    });
  }//ends
  week() {  // code for sorting according to week
    this.userService.get_weekData(this.m_id).subscribe((response) => {
      this.data = response;
      return this.data;
    });
  }//ends
  month() {  // code for sorting according to month
    this.userService.get_monthData(this.m_id).subscribe((response) => {
      this.data = response;
      return this.data;
    });
  }//ends

  public filters = <any>{
    "to": '',
    "from": '',
  };
  public filters2 = <any>{
    "to": '',
    "from": '',
  };

  public getByDate1(event1: any){
    console.log("event1",new Date(event1));
    this.event_arr1 =new Date(event1);
    this.trigger_event1 = true
    this.getByDate()
  } 

  public getByDate2(event2: any){
    console.log("event2",new Date(event2));
    this.event_arr2 =new Date(event2);
    this.trigger_event2 = true
    this.getByDate()
  }


  public getByDate() {
    
    if(this.trigger_event1 == true || this.trigger_event2 == true){
// console.log("called inside")
    this.data = this.data2;
  
    this.filters['from'] = this.event_arr1;
    this.filters['to'] = this.event_arr2;
    if (this.filters['from'] !== '' && this.filters['to'] !== '') {
      console.log(this.filters['from'], '===', this.filters['to']);
      this.data = this.data.filter(o => { return new Date(o.reading_time) >= new Date(this.filters['from']) && new Date(o.reading_time) <= new Date(this.filters['to']) });
      console.log("time data",this.data);
    }
  }

    //return this.data;
  }
 

  /*------search filter code------*/
  // show1: boolean = false;
  // Search1() { //code for filter in company column
  //   if (this.Client == "") {
  //     this.ngOnInit();
  //   } else {
  //     this.data = this.data.filter(res => {
  //       return res.Client.toLocaleLowerCase().match(this.Client.toLocaleLowerCase());
  //     })
  //   }
  // }//ends

  /*---------end---*/

  /*------sorting code start---------*/
  key: string = ''; //sorting variable
  reverse: boolean = false; //sorting variable
  sortClient(key: any) { //sort function asc/desc
    this.key = 'Client';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortVoltage_A(key: any) { //sort function asc/desc
    this.key = 'KWh_D';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortVoltage_B(key: any) { //sort function asc/desc
    this.key = 'KWh_DpR';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortVoltage_C(key: any) { //sort function asc/desc
    this.key = 'KWh_DnR';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortVoltage_Avg(key: any) { //sort function asc/desc
    this.key = 'KVARh_D';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortFrequency(key: any) { //sort function asc/desc
    this.key = 'KVARh_R';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortCurrent_A(key: any) { //sort function asc/desc
    this.key = 'KVARh_DpR';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortCurrent_B(key: any) { //sort function asc/desc
    this.key = 'KVARh_DnR';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortCurrent_C(key: any) { //sort function asc/desc
    this.key = 'KVAh_D';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortCurrent_Avg(key: any) { //sort function asc/desc
    this.key = 'KVAh_DpR';
    this.key = key;
    this.reverse = !this.reverse;
  }
  sortActivePower(key: any) { //sort function asc/desc
    this.key = 'KVAh_DnR';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortReactivePower(key: any) { //sort function asc/desc
    this.key = 'Aavg';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortApparentPower(key: any) { //sort function asc/desc
    this.key = 'V_LL';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortPowerFactor(key: any) { //sort function asc/desc
    this.key = 'V_LN';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortKWH(key: any) { //sort function asc/desc
    this.key = 'KW';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortkVARh(key: any) { //sort function asc/desc
    this.key = 'KVAR';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortkVAh(key: any) { //sort function asc/desc
    this.key = 'KVA';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  sortkVA(key: any) { //sort function asc/desc
    this.key = 'PF';
    this.key = key;
    this.reverse = !this.reverse;
  }//end
  /*---------end------*/



 
  check1: boolean = false;
  check2: boolean = false;
  check3: boolean = false;
  check4: boolean = false;
  check5: boolean = false;
  check6: boolean = false;
  check7: boolean = false;
  check8: boolean = false;
  check9: boolean = false;
  check11: boolean = false;
  check22: boolean = false;
  check33: boolean = false;
  check44: boolean = false;
  check55: boolean = false;
  check66: boolean = false;
  check77: boolean = false;
  check88: boolean = false;


  KWh: boolean = true;
  KVARh_Lag: boolean = true;
  KVARh_Lead: boolean = true;
  KVAh: boolean = true;
  Ampere: boolean = true;
  Avg_Volt_LL: boolean = true;
  Avg_Volt_LN: boolean = true;
  KW: boolean = true;
  KVAR: boolean = true;
  KVA: boolean = true;
  PF: boolean = true;
  

  
  showhide1() {
    if(this.check88 = !this.check88){
      this.KWh = false
      console.log(this.KWh)

      console.log("Remove KWh");
    }
    else{
      this.KWh = true
      console.log(this.KWh)

      console.log("Add KWh");
    }
   
  }
  showhide2() {
    this.check2 = !this.check2;
  }
  showhide3() {
    this.check3 = !this.check3;
  }
  showhide4() {
    this.check4 = !this.check4;
  }
  showhide5() {
    this.check5 = !this.check5;
  }
  showhide6() {
    this.check6 = !this.check6;
  }
  showhide7() {
    this.check7 = !this.check7;
  }
  showhide8() {
    this.check8 = !this.check8;
  }
  showhide9() {
    this.check9 = !this.check9;
  }
  showhide11() {
    this.check11 = !this.check11;
  }
  showhide22() {
    this.check22 = !this.check22;
  }
  showhide33() {
    this.check33 = !this.check33;
  }
  showhide44() {
    this.check44 = !this.check44;
  }
  showhide55() {
    this.check55 = !this.check55;
  }
  showhide66() {
    this.check66 = !this.check66;
  }
  showhide77() {
    this.check77 = !this.check77;
  }
  showhide88() {//PF
    if(this.check88 = !this.check88){
      this.PF = false
      console.log(this.PF)

      console.log("Remove PF");
    }
    else{
      this.PF = true
      console.log(this.PF)
      console.log("Add PF");
    }
   
  }
  a :any;

  exportexcel(): void { //download function

    // this.data.forEach(element =>console.log("each",element.PF));
        let element = this.data;
      // console.log(this.PF)

       
        // console.log("table data",element[0].PF);
        // console.log("table data",element);

      //   for (let i =0; i < element.length; i++){
        
      //     // pF   KWH
      //     // 0    0
      //     // 0    1 
      //     // 1   0
      //     // 1    1


      //     if(!this.PF || !this.KWh){
      //       // console.log("inside if condition  ", this.pf)
      //       var PF = omit(element[i], [ 'PF'])
      //       // var value_of[] =[]
      //       // var PF = omit(element[i], [`${value_of}`])
      //       this.sample.push(PF)
      //     }
      //     if(!this.KWh){
      //       // console.log("inside if condition  ", this.PF)
      //       var KWh = omit(element[i], [ 'KWh'])
      //       this.sample.push(KWh)

      //     }
  
         
      //   }

      //   console.log(" Please uncheck PF")
        
        
      //   if(!this.PF || !this.KWh){
      //     console.log(" if not PF",this.sample)
          
      //     console.log(document.getElementById("excel-table"))
      //     // let options:XLSX.JSON2SheetOpts  = {header: ['Name', 'Surname', 'Age']};
      //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sample);
      //     // console.log(ws);
      //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //   // console.log(wb);
      //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
      //   XLSX.writeFile(wb, this.fileName);
        
      // }else{
      //     console.log(document.getElementById("excel-table"))
      //     // let options:XLSX.JSON2SheetOpts  = {header: ['Name', 'Surname', 'Age']};
      //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
      //     // console.log(ws);
      //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //   // console.log(wb);
      //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
      //   XLSX.writeFile(wb, this.fileName);
      //   }
        // var removed = element.splice(17,1);

  
       

        
      
        console.log(document.getElementById("excel-table"))
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
      // console.log(ws);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        // console.log(wb);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
        XLSX.writeFile(wb, this.fileName);
      }//ends
    

}

