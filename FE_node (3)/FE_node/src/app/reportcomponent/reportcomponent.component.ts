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
import { reportData, Report } from '../report';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-reportcomponent',
  templateUrl: './reportcomponent.component.html',
  styleUrls: ['./reportcomponent.component.css']
})
export class ReportcomponentComponent implements OnInit {

  data: Sensor[] = [];

  try: Sensor[] = [];
  m_id: string = ' ';
  m_id2: string = ' ';
  companyName: string = ' ';
  Client: any; //searching variable filter
  Reading_Time: any;
  p: number = 1; //pagination variable
  faFilter = faFilter;
  faDownload = faDownload;
  faSort = faSort;
  fileName = "ExcelSheet.xlsx"; //download file 
  data1: Sensor[] = [];
  data2: Report[] = [];
  last_array: Report[] = [];
  datepicker: boolean = false;
  value: any;
  meter: Meter[] = [];
  show1: boolean = false;
  mySub!: Subscription;
  b: any;
  x1: number[] = [];
  abs: any;
  addreportdata: FormGroup | any;
  last_arra1y: any;
  dataxyz: any;
  string1: any;
  total_reading_time: any[] = [];
  total_reading_time2: any[] = [];
  Model= new reportData();
  loader: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private shared: SharedService, private meterreg: MeterregService) {
    this.userService.get_companyDrpdwn_data().subscribe((response) => {
      this.data1 = response;
      // console.log("filter",this.data1)
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
  
  changename() {
    console.log("calledbygrid1");
    this.ngOnInit();
  }

  addname() {
    console.log("calledbynavbar");
    this.ngOnInit();
  }

  loading(){
    this.loader = false;
    console.log("Loading function working....")
  }

  // async getmeterId(event: any) {
  //   this.m_id = event.target.value;

  //   let response =await this.userService.sendidMeter(this.m_id);
  //   let data_res=await response.json();
  //   this.data=data_res;
  //   this.reportdata();
      
  //   setTimeout(() => {
  //     this.getreportdata();
  //   }, 500);

 
  // }

  getmeterId(event: any) {
    this.m_id = event.target.value;
    this.loader = true

    this.userService.sendidMeter2(this.m_id).subscribe((response) => { // this service take time to fetch data
      // this.data = response;
      console.log(response,"res")
      // let bytes  =  CryptoJS.AES.decrypt(response, 'senselive');
        // let key = bytes.toString(CryptoJS.enc.Utf8);
        // this.data=JSON.parse(key)
      this.reportdata();
      
      setTimeout(() => {
        this.getreportdata();
      }, 1000);
      this.loading();
      return this.data;
      
    });
 
  }

 

  async getreportdata(){

    let response =await this.userService.displayReportData(this.m_id);
    let data_res=await response.json();
    this.data2=data_res;


  }

   excelsheet(){ // excel sheet download function
    console.log("excel",this.data2)
    let element = this.data2;
     console.log(document.getElementById("excel-table"))
    // let options:XLSX.JSON2SheetOpts  = {header: ['Name', 'Surname', 'Age']};
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    // console.log(ws);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // console.log(wb);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);
  }
  

  

  

  a: any[] = [];
  final_kvah: any
  initial_kvah: any
  final_time: any
  initial_time: any
  final_index: boolean = false
  initial_index: boolean = false
  non_zero_after_final: boolean = false
  first_zero: boolean = false
  kw_sudo_length: any[] = [];
  final_index_kvah_d: any[] = [];
  initial_index_kvah_d: any[] = [];
  initial_index_kvah_d_2: any[] = [];
  final_index_readingtime: any[] = [];
  initial_index_readingtime: any[] = [];
  final_meterid: any[] = [];

  total_reading_min: any[] = [];
  total_reading_sec: any[] = [];
  total_reading_hour: any[] = [];
  total_kvah: number[] = [];
  m: any[] = []
  n: any[] = []

  modeldata:any=[] ;
  modeldata2:any ;
  modeldata3:any;
  // modeldata2: any=[];
  // modeldata3: any=[];


  j = 0
 
  async reportdata(): Promise<void> { 
    
    
    
    this.data.reverse();
   
    // console.log("data",this.data.length)
    // this.initial_index_kvah_d.push(NaN);

    for (i = 0; i < this.data.length; i++) {
      
       
     
      this.a[i] = parseFloat(this.data[i].KW);

      // console.log("a[i-1] ",this.a[i-1])
      // console.log("a[i] ",this.a[i])
    
      // console.log("This is aof i ", this.a[i]) 
      
      if ((this.a[i - 1] !== 0) && (this.a[i] == 0)) {

        this.final_index_kvah_d.push(this.data[i].KVAh_D)
        this.final_index_readingtime.push(this.data[i].reading_time)
        this.final_meterid.push(this.data[i].Device_Id);

         
      }

     
  



      if (this.final_index == false) {
        if ((this.a[i - 1] !== 0) && (this.a[i] == 0)) {
          this.final_index = true
          // console.log("inside if condition")
          // this.final_time = this.data[i].reading_time
          // console.log("ft", this.final_time)
          // this.final_kvah = this.data[i].KVAh_D
          // console.log("fk", this.final_kvah)
          // console.log("KW value ", this.data[i].KW)
          // this.kw_sudo_length.push(this.data[i].KW);


          // this.initial_index_kvah_d.push(this.data[i].KVAh_D);
          // this.initial_index_readingtime.push(this.data[i].reading_time);

          // console.log("index", i)
        }

      }


      // if((this.a[i-1]==0)&&(this.a[i]!==0)){
      //   this.kw_sudo_length.push(this.a[i])
      // }

      
      if ((this.final_index == true) && (this.initial_index == false)) {

        if (this.a[i] !== 0) {
          this.non_zero_after_final = true
          // console.log("This is a NON ZERO value")
        }
        if ((this.a[i - 1] !== 0) && (this.a[i] == 0) && (this.non_zero_after_final == true)) {
          // console.log("Flag =====> True")
          this.first_zero = true
          // this.initial_time = this.data[i - 1].reading_time
          // console.log("initial time == ", this.initial_time)
          // this.initial_kvah = this.data[i - 1].KVAh_D
          // console.log("inital kvah  == ", this.initial_kvah)

          // console.log("index", i-1)
          // console.log("KW value ", this.data[i - 1].KW)
          // this.kw_sudo_length.push(this.data[i - 1].KW)
          this.initial_index_kvah_d.push(this.data[i - 1].KVAh_D)
          
          this.initial_index_readingtime.push(this.data[i - 1].reading_time)



        }
        
      }
      
      

      

      if ((this.a[i - 1] !== 0) && (this.a[i] == 0) || (this.a[i - 1] == 0) && (this.a[i] !== 0)) {
        this.j = this.j + 1
      
      }

     


      }

      // this.initial_index_kvah_d.push(NaN);
    // Separate arrays for initial and final index
    // console.log("Final index for kvah_d")
    // // this.final_index_kvah_d.reverse()
    // console.log(this.final_index_kvah_d.length)

    // console.log("Initial index for kvah_d")
    // console.log(this.initial_index_kvah_d.length)

    // console.log("model",this.modeldata);
    // console.log("Final index for reading Time")
    // console.log(this.final_index_readingtime)
    // console.log("Initial index for reading Time")
    // console.log(this.initial_index_readingtime)

    // console.log("Index for meter_ID")
    // console.log(this.final_meterid);

    // Final arrays for total time and total kvah values



    for (i = 0; i < this.final_index_kvah_d.length; i++) {
      
      this.m[i] = parseFloat(this.final_index_kvah_d[i]);
      this.n[i] = parseFloat(this.initial_index_kvah_d[i]);

      this.total_kvah[i] = this.m[i] - this.n[i];
    }

    // console.log("total kvah  --->", this.total_kvah)
   



    var m_n_minutes = [];
    var m_n_hour = [];
    var m_n_day = [];

    for (i = 0; i < this.final_index_readingtime.length; i++) {
      this.m[i] = new Date(this.final_index_readingtime[i]);
      this.n[i] = new Date(this.initial_index_readingtime[i]);

      var sample_hour_m = this.m[i].getHours()   // 19
      var sample_minute_m = this.m[i].getMinutes()
      var sample_hour_n = this.n[i].getHours()    // 18
      var sample_minute_n = this.n[i].getMinutes()
      var sample_day_m = this.m[i].getDate()
      var sample_day_n = this.n[i].getDate()

      m_n_hour[i] = sample_hour_m - sample_hour_n;
      m_n_minutes[i] = sample_minute_m - sample_minute_n;
      m_n_day[i] = sample_day_m - sample_day_n;


      // If clock at 12:00  -- middle column
      if (sample_hour_m == 0) {
        var sample = 24
        m_n_hour[i] = sample - sample_hour_n;
        // console.log("sample h", m_n_hour[i])
      }

      // 21st-->2022-02-28 22:33:03" initial   60  + 60-33 + 20     = 80 + 27 = 107
      // 21st--> "2022-03-01 00:20:19" final
      // "-27:-22:-13" total

      var total_diff_previous_month_days_and_initial
      // If month change
      if (sample_day_m == 1) {
        var sample_month_m = this.m[i].getMonth() + 1                                               // + 1 added because using getMonth() January returns 0
        var previous_month = 0

        //  For extreme value of sample_month_m
        if (sample_month_m == 1) {
          previous_month = 12
        } else {
          previous_month = sample_month_m - 1
        }

        // To check number of days in previous month

        // To check if previous month = 31 days
        if ((previous_month == 1) || (previous_month == 3) || (previous_month == 5) || (previous_month == 7) || (previous_month == 8) || (previous_month == 10) || (previous_month == 12)) {
          var previous_month_days = 31
        }
        // To check if previous month = feb
        else if ((previous_month == 2)) {
          var previous_month_days = 28

        }
        // To check if previous month = 30 days
        else {
          var previous_month_days = 30

        }

        var diff_previous_month_days_and_initial = previous_month_days - sample_day_n

        total_diff_previous_month_days_and_initial = (diff_previous_month_days_and_initial) * 24 * 60 + sample_hour_m * 60 + sample_minute_m

        // Array for Total time
        this.total_reading_time[i] = total_diff_previous_month_days_and_initial



      }


      if (m_n_hour[i] == 0) {
        var sample_hour = 0
        var total_minutes = sample_hour + m_n_minutes[i]
        this.total_reading_time[i] = total_minutes
      } else
        if (m_n_hour[i] == 1) {
          var sample_hour = 60
          var total_minutes = sample_hour + m_n_minutes[i]
          this.total_reading_time[i] = total_minutes
        
        } else

          if (m_n_hour[i] == 2) {
            var sample_hour = 120
            var total_minutes = sample_hour + m_n_minutes[i]
            this.total_reading_time[i] = total_minutes
           
          }
          else
            if (m_n_hour[i] == 3) {
              var sample_hour = 180
              var total_minutes = sample_hour + m_n_minutes[i]
              this.total_reading_time[i] = total_minutes
              
            }
            else
              if (m_n_hour[i] == 4) {
                var sample_hour = 240
                var total_minutes = sample_hour + m_n_minutes[i]
                this.total_reading_time[i] = total_minutes
               
              }


      this.total_reading_time2[i] = m_n_day[i] + ":" + m_n_hour[i] + ":" + m_n_minutes[i]
 
      
      

    }
    // this.total_reading_time=[m_n_day,m_n_hour,m_n_minutes];
    // console.log("total reading time  --->", this.total_reading_time)
    // console.log("total reading time format --->", this.total_reading_time2)


    for(i=0; i<this.final_index_kvah_d.length; i++){
      this.Model =  new reportData()
    
      this.Model.Device_id=this.final_meterid[i]
      this.Model.final_reading=this.final_index_readingtime[i]
      this.Model.initial_reading=this.initial_index_readingtime[i]
      this.Model.total_time=this.total_reading_time[i]
      this.Model.final_kvah= this.final_index_kvah_d[i]
      this.Model.initial_kvah=this.initial_index_kvah_d[i]
      this.Model.total_kvah=this.total_kvah[i]
this.modeldata.push(this.Model)
      // this.final_index_kvah_d
      // this.final_index_readingtime
      // this.initial_index_kvah_d
      // this.initial_index_readingtime
      // this.total_kvah
      // this.total_reading_time
      // this.final_meterid
    }
//     this.modeldata2=JSON.stringify(this.modeldata)
// this.modeldata3=JSON.parse(this.modeldata2 );
    // console.log("Model   --->>",this.modeldata)



    

    // this.addreportdata= {initial_reading: this.string1 ,final_reading:"dfwef",initial_kvah:20,final_kvah:30,total_time:"dfwef",total_kvah:343};
    // for (i = 0; i < 400; i++) {

    // this.addreportdata= {initial_reading: this.initial_index_readingtime[0] ,final_reading:"dfwef",initial_kvah:20,final_kvah:30,total_time:"dfwef",total_kvah:343};
    
    // this.userService.add_report2(this.modeldata).subscribe(res=>{
    //   console.log("called s in");
      

    //   // this.ngOnInit();
    // },(error: any) => {
    //       console.log('add report',error)
    //   });

      let response = await this.userService.add_report2(this.modeldata).then((reportdata: any) => {
        // console.log('add report', reportdata)
      }).catch(error => {
   
        console.log('There was an error!', error);
    });

    // console.log("service call")
    // }


    this.j = this.j + 1
    console.log("This is the sudo length of KW")
    console.log(this.j)

    var i = 0;

    // console.log(document.getElementById("excel-table"))
    // // let options:XLSX.JSON2SheetOpts  = {header: ['Name', 'Surname', 'Age']};
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    // // console.log(ws);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // // console.log(wb);
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // XLSX.writeFile(wb, this.fileName);
    // setInterval(() => {


    // }, 6000);
  }//ends



}

