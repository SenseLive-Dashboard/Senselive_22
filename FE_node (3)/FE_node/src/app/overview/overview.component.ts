import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardService } from '../card.service';
import { faChartLine, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sensor } from '../sensorData';
import { Parameter } from '../parameter';
import { DialogboxService } from '../dialogbox.service';
import { SharedService } from '../shared.service';
import * as common from '../baseurl';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { sortcard } from '../sorting';
import { FormControl, Validators } from "@angular/forms";
import { HttpService } from "../Shared/http.service";
import { UniqueparaValidator } from "../parameter-validator.directive";
import { ChartdataService } from '../chartdata.service';
import { MeterregService } from '../meterreg.service';


declare const CanvasJS: any;

// function current_avg_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];
//     var chart = new CanvasJS.Chart("chartContainer5", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Current Average",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Average",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]

//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Current_Avg
//         });

//       }
//       chart.render();
//     }

//     $.getJSON(common.endpoint + '/Graph_current-avg.php?mid=' + mid, addData);
//   })
// }

// function current_phase1_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];
//     var chart = new CanvasJS.Chart("chartContainer6", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Current Phase1",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Phase 1",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]

//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Current_A
//         });

//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_current-phase1.php?mid=' + mid, addData);
//   })
// }

// function current_phase2_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer7", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Current Phase2",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Phase 2",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Current_B
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_current-phase2.php?mid=' + mid, addData);
//   })
// }

// function current_phase3_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer8", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Current Phase3",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Phase 3",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Current_C
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_current-phase3.php?mid=' + mid, addData);
//   })
// }

// function voltage_avg_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer1", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Voltage Average",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Average",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Voltage_Avg
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_voltage-avg.php?mid=' + mid, addData);
//   })
// }

// function voltage_phase1_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer2", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Voltage Phase1",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Phase 1",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Voltage_AN
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_voltage-phase1.php?mid=' + mid, addData);
//   })
// }

// function voltage_phase2_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer3", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Voltage Phase2",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Phase 2",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Voltage_BN
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_voltage-phase2.php?mid=' + mid, addData);
//   })
// }

// function voltage_phase3_Graph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer4", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Voltage Phase3",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Phase 3",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Voltage_CN
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_voltage-phase3.php?mid=' + mid, addData);
//   })
// }

// function activePowerGraph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer9", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Active Power",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Average",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Active_Power
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_activepower.php?mid=' + mid, addData);
//   })
// }

// function reactivePowerGraph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer10", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Reactive Power",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Average",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]
//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Reactive_Power
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_reactivepower.php?mid=' + mid, addData);
//   })
// }

// function apparentPowerGraph(mid: string) {

//   $(document).ready(function () {
//     var dataPoints: { x: Date; y: any; }[] = [];

//     var chart = new CanvasJS.Chart("chartContainer11", {
//       animationEnabled: true,
//       theme: "light2",
//       width: 450,
//       height: 200,
//       axisY: {
//         title: "Apparent Power",
//         titleFontSize: 10,
//         includeZero: true
//       },
//       legend: {
//         cursor: "pointer",
//         itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

//           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           e.chart.render();
//         }
//       },
//       data: [{
//         type: "spline",
//         showInLegend: true,
//         legendText: "Average",
//         yValueFormatString: " ##.00 Units",
//         dataPoints: dataPoints
//       }]

//     });
//     function addData(data: string | any[]) {
//       for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//           x: new Date(data[i].reading_time),
//           y: data[i].Apparent_Power
//         });
//       }
//       chart.render();
//     }
//     $.getJSON(common.endpoint + '/Graph_apparentpower.php?mid=' + mid, addData);
//   })
// }
// $('#record_nav ul li').on('click', function (e) {
//   $('#record_nav ul li.selected').removeClass('selected');
//   $(this).addClass('selected');
//   $('.content').hide();
//   var id = $(this).data('target');
//   $(id).show();
// });

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  //  triggerval: number | undefined;
  //  triggerval2: number | undefined;


  name1: any;
  age: any;
  loading = false;
  buttionText = "Submit";
  ese: any;
  divs: number[] = [];


  notifier = new Subject();

  count:any=4;
  count_pf:any=4;
  count_kva:any=4;
  sresult: any;
  i = 0;



  [x: string]: any;
  showModal: boolean | any;
  addCardForm: FormGroup | any;
  submitted = false;
  faTimes = faTimes;
  // data: Emp[] = [];
  // data1: Emp[] = [];
  // data2: Emp[] = [];
  // data3: Emp[] = [];
  // data4: Emp[] = [];
  // data5: Emp[] = [];
  data: Sensor[] = [];
  data1: Sensor[] = [];
  data2: Sensor[] = [];
  data3: Sensor[] = [];
  data4: Sensor[] = [];
  data5: Sensor[] = [];
  kwh: Sensor[] = [];
  kvarh: Sensor[] = [];
  kvah: Sensor[] = [];
  sort1: sortcard[] = [];
  sort2: sortcard[] = [];
  sort3: sortcard[] = [];
  sort14: sortcard[] = [];
  sort5: sortcard[] = [];
  sort6: sortcard[] = [];
  sort7: sortcard[] = [];
  sort8: sortcard[] = [];
  sort9: sortcard[] = [];
  sort10: sortcard[] = [];
  sort11: sortcard[] = [];
  sort12: sortcard[] = [];
  //Parameter: Emp[] = [];

  cardData: Parameter[] = [];

  faChartLine = faChartLine;
  faPlusCircle = faPlusCircle;
  mid: any;
  mySub!: Subscription;

  meter_id_arr: string[] = ['EM6400NG03', 'EM6400NG02'];
  show() {
    // console.log("Clicked");
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event




  hide() {

    this.showModal = false;
    this.addCardForm.reset();
    this.ngOnInit();

  }


  constructor(public http: HttpService, private formBuilder: FormBuilder, private chart: ChartdataService, private shared: SharedService, private cardService: CardService, private dialogboxService: DialogboxService, private meterreg: MeterregService) {



  }

  mail_trigger_kw : boolean = false;
  s : boolean = false;
  s1 : boolean = false;
  s2 : boolean = false;
  mail_trigger_pf : boolean = false;
  mail_trigger_kva : boolean = false;

  ngOnInit(): void {
    //     const max = 10
    // const min= -10
    // const result = Math.random()*(max - min) + min
    // console.log(Math.floor(result))

    this.addbutton();
    this.value2 = JSON.parse(window.sessionStorage.getItem('userdata') || '{}');


    // console.log("cus cards",this.value2[0]);



    localStorage.setItem("meterid", " ");


    this.addCardForm = this.formBuilder.group({

      data_type: ['', Validators.required],
      Max1: ['', Validators.nullValidator],
      Min1: ['', Validators.nullValidator],
      unit: ['', Validators.nullValidator],
      M_id: [this.value2[0], Validators.nullValidator]


    });

    this.value = JSON.parse(window.sessionStorage.getItem('userdata') || '{}');
    this.email = JSON.parse(window.sessionStorage.getItem('Email') || '{}');
    // console.log("value=====================>",this.value);



    if (this.shared.subsVar1 == undefined) {
      console.log("overviewngonit");
      // this.shared.subsVar1 = this.shared.invoketableFunction.subscribe( () => {
      this.mySub = interval(5000).subscribe(func => {


        var arr: any = JSON.parse(localStorage.getItem("new_meter_id_array") || '{}');
        // console.log("local arr",arr.length);


        for (this.m_id = 0; this.m_id < arr.length; this.m_id++) {
          // if(this.meter_id_arr[this.m_id]=="true"){
          // console.log("Inside for loop")
          // console.log(localStorage.getItem("meterid"))


          if (localStorage.getItem("meterid") == arr[this.m_id]) {

            const meterid1: any = localStorage.getItem("meterid");
            //  this.chart.getDataW(meterid1)
            this.myFunctionOne(meterid1);

            this.day(meterid1);
            this.week(meterid1);
            this.month(meterid1);
            //  console.clear()
          }

        }

      });
      // });
    }
  //   console.log("outside meter click 1")

  //   if(this.meter_click == true){
  //     console.log("inside meter click")
  //   this.card_service();
  // }
  // console.log("outside meter click 2")
    this.card_service();

  }





  getmetname(bname: any) {

    this.metname = bname;
    console.log(this.metname);

    localStorage.setItem('Button_Name', this.metname);

    this.addbutton();
  }
  addbutton() {
    // this.vd1=JSON.parse(localStorage.getItem("Button_Name")|| '{}');
    // console.log("fetch parse",this.vd1);
    this.vd2 = localStorage.getItem("Button_Name");
    // console.log("fetch",this.vd2);
    this.triggerval1 = this.vd;
  }


  async week(meterid: string) {
    this.m_id = meterid;
    this.m_id2 = meterid;
    this.m_id3 = meterid;
    this.m_id4 = meterid;
    // console.log("id",this.m_id);
    let response2 = await this.cardService.get_week1(this.m_id);
    let data_res2 = await response2.json();
    this.sort2 = data_res2;

    let response5 = await this.cardService.get_week2(this.m_id2);
    let data_res5 = await response5.json();
    this.sort5 = data_res5;

    let response8 = await this.cardService.get_week3(this.m_id3);
    let data_res8 = await response8.json();
    this.sort8 = data_res8;

    let response11 = await this.cardService.get_week4(this.m_id4);
    let data_res11 = await response11.json();
    this.sort11 = data_res11;

    // this.cardService.get_week1(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort2=[];
    //   this.sort2 = response;
    //   return this.sort2;
    // });

    // this.cardService.get_week2(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort5=[];
    //   this.sort5 = response;
    //   return this.sort5;
    // });

    // this.cardService.get_week3(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort8=[];
    //   this.sort8 = response;
    //   return this.sort8;
    // });
    // this.cardService.get_week4(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort11=[];
    //   this.sort11 = response;
    //   return this.sort11;
    // });
  }

  async day(meterid: string) {
    this.m_id = meterid;
    this.m_id2 = meterid;
    this.m_id3 = meterid;
    this.m_id4 = meterid;

    let response1 = await this.cardService.get_dayData1(this.m_id);
    let data_res1 = await response1.json();
    this.sort1 = data_res1;

    let response14 = await this.cardService.get_dayData2(this.m_id2);
    let data_res14 = await response14.json();
    this.sort14 = data_res14;

    let response7 = await this.cardService.get_dayData3(this.m_id3);
    let data_res7 = await response7.json();
    this.sort7 = data_res7;

    let response10 = await this.cardService.get_dayData4(this.m_id4);
    let data_res10 = await response10.json();
    this.sort10 = data_res10;

    // this.cardService.get_dayData1(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort1=[];
    //   this.sort1 = response;
    //   return this.sort1;
    // });

    // this.cardService.get_dayData2(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort14=[];
    //   this.sort14 = response;
    //   return this.sort14;
    // });
    // this.cardService.get_dayData3(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort7=[];
    //   this.sort7 = response;
    //   return this.sort7;
    // });
    // this.cardService.get_dayData4(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort10=[];
    //   this.sort10 = response;
    //   return this.sort10;
    // });
  }
  async month(meterid: string) {
    this.m_id = meterid;
    this.m_id2 = meterid;
    this.m_id3 = meterid;
    this.m_id4 = meterid;

    let response3 = await this.cardService.get_month(this.m_id);
    let data_res3 = await response3.json();
    this.sort3 = data_res3;

    let response6 = await this.cardService.get_month2(this.m_id2);
    let data_res6 = await response6.json();
    this.sort6 = data_res6;

    let response9 = await this.cardService.get_month3(this.m_id3);
    let data_res9 = await response9.json();
    this.sort9 = data_res9;

    let response12 = await this.cardService.get_month4(this.m_id4);
    let data_res12 = await response12.json();
    this.sort12 = data_res12;

    // this.cardService.get_month(this.m_id).subscribe( (response: sortcard[]) => {
    //   // this.sort3=[];
    //   this.sort3 = response;
    //   return this.sort3;
    // });
    // this.cardService.get_month2(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort6=[];
    //   this.sort6 = response;
    //   return this.sort6;
    // });
    // this.cardService.get_month3(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort9=[];
    //   this.sort9 = response;
    //   return this.sort9;
    // });
    // this.cardService.get_month4(this.m_id).subscribe((response: sortcard[]) => {
    //   // this.sort12=[];
    //   this.sort12 = response;
    //   return this.sort12;
    // });
  }

  async myFunctionOne(meterid: string) {



    // console.log("overview running");
    this.m_id = meterid;
    // console.log(this.m_id);

    // console.log("mid: ",this.m_id);
    // this.card = await this.cardService.get_meterCardData(this.m_id).subscribe((response) => {
    //   // this.data=[];
    //   this.data = response;
    let response = await this.cardService.get_meterCardData(this.m_id);
    let data_res = await response.json();
    this.data = data_res;
   


    this.KW=parseFloat(this.data[0].KW);
    this.PF=parseFloat(this.data[0].PF);
    this.KVA=parseFloat(this.data[0].KVA);



    // const max = 10
    // const min= -10
    // this.sresult = Math.random()*(max - min) + min
    // this.sresult = Math.floor(this.sresult)
    // console.log(Math.floor(this.sresult))
  
   
    this.card_service()
    // if((this.mail_trigger_kw == true || this.mail_trigger_pf == true || this.mail_trigger_kva == true)&&(this.count == 0)){       // checks if mail is triggered for first time
    if((this.count == 0)||(this.count_pf == 0)||(this.count_kva == 0)){       // checks if mail is triggered for first time
      this.mail_trigger_function()
      console.log("mail trigger function is called !!!")
    }

  


    

  }

  
  mail_trigger_function(){

    
    this.s = true
    this.s1 = true
    this.s2 = true
    
    if(this.count == 0){
      
      this.mail_trigger_kw = false
      this.register("KW");
      console.log("KW mail has been delivered!")
      this.count=4;
      console.log("after mail count",this.count)
    }

  
    if(this.count_pf == 0){
      this.mail_trigger_pf = false
      this.register("PF");
      console.log("PF mail has been delivered!")
      this.count_pf =4;
    }

    
    if(this.count_kva == 0){
      this.mail_trigger_kva = false
      this.register("KVA");
      console.log("KVA mail has been delivered!")
      this.count_kva = 4;
    }
   

    
    
  }


  
  
  


  card_service(){


    this.cardService.add_card(this.value2[0]).subscribe((result) => {
      this.cardData = result;
      // console.log("Meter Card Data:",this.cardData);
      // console.log("Meter Card Data 0th index:",this.cardData[0]);
      // console.log("Meter Card Data 0th index Max:",this.cardData[0].Max1);


      this.cardData.forEach(a=>{
        if(a.data_type=='KW'){
          if(a.Max1<this.KW){
            
            // if(this.s == false){
              this.mail_trigger_kw = true
              // console.log("count max kw    BEFORE--> ", this.count)
              this.count = this.count - 1
              // console.log("count max kw     AFTER --> ", this.count)
              console.log("trigger Max KW ")
              

            // }
console.log("AFTER mail --> ", this.count)
            // console.log("trigger Max KW 2")
        

          }
          

        else if(a.Min1>this.KW){

          // if(this.s == false){
            this.mail_trigger_kw = true
            // console.log("count min kw    BEFORE--> ", this.count)
            this.count = this.count - 1
            // console.log("count min kw     AFTER --> ", this.count)


            console.log("trigger Min KW ")

          // }
          // console.log("trigger Min KW 2")

        }
        else{
        // else if ((a.Min1<=this.sresult)&& (this.sresult<=a.Max1)){
          this.count = 4
      console.log("stable KW")
    }
    
        }

       if(a.data_type=='PF'){
      if(a.Max1<this.PF){
            
        // if(this.s1 == false){
          this.mail_trigger_pf = true
          this.count_pf = this.count_pf - 1
          console.log("trigger Max PF")

        // }

        // console.log("trigger Max PF 2")
    

      }
    else if(a.Min1>this.PF){
      // if(this.s1 == false){
        this.mail_trigger_pf = true
        this.count_pf = this.count_pf - 1
        console.log("trigger Min PF")

      // }
      // console.log("trigger Min PF 2")

    }
    else{
      this.count_pf = 4
  console.log("stable PF")
}


        }

       if(a.data_type=='KVA'){
      if(a.Max1<this.KVA){
            
        // if(this.s2 == false){
          this.mail_trigger_kva = true
          this.count_kva = this.count_kva - 1
          console.log("trigger Max KVA")

        // }

        // console.log("trigger Max KVA 2")
    

      }
    else if(a.Min1>this.KVA){
      // if(this.s2 == false){
        this.mail_trigger_kva = true
        this.count_kva = this.count_kva - 1
        console.log("trigger Min KVA")

      // }
      // console.log("trigger Min KVA 2")

    }
    else{
      this.count_kva = 4
  console.log("stable KVA")
}


        }
      })
      return this.cardData;
    },
      (error) => {
        console.log(error)
      });
  }

  register(para:string) {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: this.value,
      email: this.email,
      value: para
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      (data: any) => {
        let res: any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} with mail id ${user.email} & ${user.value} an alert mail has been sent with message id is ${res.messageId}`
        );
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      }, () => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()

    this.mySub.unsubscribe();
    this.shared.subsVar1.unsubscribe();


  }


  get f() { return this.addCardForm.controls; }

  async onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.addCardForm.invalid) {
      return;
    }
    if (this.submitted) {

      // console.log("Added card",this.addCardForm.value.data_type);
      // console.log("max",this.addCardForm.value.Max1);
      // console.log("min",this.addCardForm.value.Min1);

        let response = await this.cardService.add_parameter(this.addCardForm.value).then((parameterdata: Parameter) => {
          // console.log("para data",parameterdata)
          this.ngOnInit();
        }).catch(error => {
         
          console.log('There was an error!', error);
      });


      this.showModal = false;
      // this.cardService.update_parameter(this.addCardForm.value).subscribe((result:Parameter)=>{

      //   // console.log(result);
      //   this.ngOnInit();
      // });
    }

    this.ngOnInit();
    this.addCardForm.reset();
    this.submitted = false;
  }

  deleteCard(id: number) {

    this.dialogboxService.confirmThis("Are you sure to delete?", () => {
      this.cardService.deleteCard(id).subscribe((cardDetails: Parameter) => {
        // console.log("Card Deleted ", cardDetails);
        this.ngOnInit();
      });
    }, function () {
      // console.log("Cancel Card Deletion") 
    })
  }


  // graph_Current_avg() {
  //   current_avg_Graph(this.m_id);
  // }
  // graph_Current_phase1() {
  //   current_phase1_Graph(this.m_id);
  // }
  // graph_Current_phase2() {
  //   current_phase2_Graph(this.m_id);
  // }
  // graph_Current_phase3() {
  //   current_phase3_Graph(this.m_id);
  // }
  // graph_Voltage_avg() {
  //   voltage_avg_Graph(this.m_id);
  // }
  // graph_Voltage_phase1() {
  //   voltage_phase1_Graph(this.m_id);
  // }
  // graph_Voltage_phase2() {
  //   voltage_phase2_Graph(this.m_id);
  // }
  // graph_Voltage_phase3() {
  //   voltage_phase3_Graph(this.m_id);
  // }
  // graph_Activepower() {
  //   activePowerGraph(this.m_id);
  // }
  // graph_Reactivepower() {
  //   reactivePowerGraph(this.m_id);
  // }
  // graph_Apparentpower() {
  //   apparentPowerGraph(this.m_id);
  // }
}
function meterid(meterid: any) {
  throw new Error('Function not implemented.');
}

