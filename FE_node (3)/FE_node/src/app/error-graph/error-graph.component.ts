

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CommonModule } from '@angular/common';
import { CanvasJS } from '../canvasJs/canvasjs.angular.component';



function graph(title:any ,/*interval:any, intervaltype:any,*/ valueFormatString:any , xValueFormatString:any , url:any , deviceID :any){
  $(document).ready(function () {
    //
    //
    var dataPoints: { x: Date; y: any; }[] = [];
    //
    //
    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "dark2",
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text                : title, 
        fontSize : 2
      },axisX : {
        scale               : "1:5 min",
        title               : "--Time-->",
        gridThickness       : 1,
// interval            : interval,
// intervalType        : intervaltype, 
valueFormatString   : valueFormatString ,
//labelAngle          :  "-45",
labelFontSize       : 10
},axisY: {
  lineThickness      : 1
},toolTip:{
  shared              : true
},
// legend: {
  //   cursor: "pointer",
  //   itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {
    
    //     if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      //       e.dataSeries.visible = false;
      //     } else {
        //       e.dataSeries.visible = true;
        //     }
        //     e.chart.render();
        //   }
        // },
        data: [{
          lineColor             :"red",
          name                  : deviceID,
          type                  : "line",
          connectNullData       : true,
          xValueFormatString    : xValueFormatString,
          //showInLegend: true,
          dataPoints            : dataPoints
        }]
        
      });
      function addData(data: string | any[]) {
        for (var i = 0; i < data.length; i++) {
          dataPoints.push({
            x: new Date(data[i].date_time),
            y: Math.round( data[i].current)
          });
        }
        chart.render();
      }
      
      $.getJSON(url+deviceID, addData);
    })
  }
  
  @Component({
    selector: 'app-error-graph',
    templateUrl: './error-graph.component.html',
    styleUrls: ['./error-graph.component.css']
  })
  
  
  export class ErrorGraphComponent implements OnInit {

  
  start:any = new Date()
  end:any = new Date()


  ngOnInit() {
    this.graph_30_min();
  }



  selectedOption: any = String;
  printedOption: any = String;
  
  options = [
    { name: "SLM-14", value: "SL_LOG_1002" },
    { name: "SLM-15", value: "SL_LOG_1001" }
  ]
  
  select_ID(){
     if (this.selectedOption == "SL_LOG_1002")
       return("SL_LOG_1002");
     else  
       return("SL_LOG_1001")
   }

  graph_30_min(){
    graph("30 Min",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/30_min.php/+",this.select_ID())   
  }

  graph_1_HR(){
    graph("1 Hour",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/1_Hr.php/+",this.select_ID())
  }

  graph_12_HR(){
    graph("12 Hour",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/12_Hr.php/+",this.select_ID())
  }

  graph_24_HR(){
    graph("1 Day",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/1_day.php/+",this.select_ID())
  }

  graph_1_week(){
    graph("1 week",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/1_week.php/+",this.select_ID())
  }

  graph_1_month(){
    graph("1 month",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/4_week.php/+",this.select_ID())
  }
  calender(date_1:any = this.start , date_2:any = this.end){
   //graph("1 month",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/4_week.php/+",this.select_ID())

    date_1 = date_1+":00";
    date_2 = date_2+":59";

    console.log(date_1);
    console.log(date_2);


    var options :any = {};

    var data_1001 :any = [];
    var data_1002 :any = [];
    var data_1003 :any = [];
    var data_1004 :any = [];
    var data_1005 :any = [];
    var data_1006 :any = [];

    var dataSeries_1001:any = { type: "line" };
    var dataSeries_1002:any = { type: "line" };
    var dataSeries_1003:any = { type: "line" };
    var dataSeries_1004:any = { type: "line" };
    var dataSeries_1005:any = { type: "line" };
    var dataSeries_1006:any = { type: "line" };

    var dataPoints_1001 :any = [];
    var dataPoints_1002 :any = [];
    var dataPoints_1003 :any = [];
    var dataPoints_1004 :any = [];
    var dataPoints_1005 :any = [];
    var dataPoints_1006 :any = [];

    
    
    function show(name:any , inter:any , type:any , format:any , angle:any ,  count:any ){
            //Better to construct options first and then pass it as a parameter
            console.log("i am hetre "+ name + " + " , inter + " + ",type+ " + ",format);
            options = {
                zoomEnabled: true,
                animationEnabled: true,
                title: {
                    text:""
                     
                },
                axisX:{
                    title: "--Time-->",
                    gridThickness: 1,
                    labelAngle:  angle,
                    labelFontSize: 15,

                  },
                axisY: {
                    lineThickness: 1
                },
                legend:{
            		cursor: "pointer",
            		fontSize: 16,
            		itemclick: toggleDataSeries
            	},
            	toolTip:{
            		shared: true
            	},
                data : [{
                    name: "SLM 14",
                    type: "line",
                    connectNullData: true,
                    xValueFormatString: format,
                    labelAngle:  angle,
                    showInLegend: true,
                    dataPoints:dataPoints_1001  
            },
            {
                name: "SLM 15",
                type: "line",
                connectNullData: true,
                xValueFormatString: format,
                labelAngle:  angle,
                showInLegend: true,
                dataPoints:dataPoints_1002  
        }
                ]
        };



        var options_1 = {
            zoomEnabled: true,
            animationEnabled: true,
            title: {
                text:""
            },axisX:{
                title: "--Time-->",
                gridThickness: 1,
                labelAngle:  angle,
                labelFontSize: 15,
              },axisY: {
                lineThickness: 1
            },legend:{
                cursor: "pointer",
                fontSize: 16,
                itemclick: toggleDataSeries
            },axisY2: {
                title: "Break Down",
                tickLength: 0
            },toolTip:{
                shared: true
            },data : [
                {
                    name: "SLM 14",
                    type: "line",
                    connectNullData: true,
                    xValueFormatString: format,
                    labelAngle:  angle,
                    showInLegend: true,
                    dataPoints:dataPoints_1001  
            },
                {
                    name: "Change Over",
                    type: "stepLine",
                    axisYType: "secondary",
                    connectNullData: true,
                    xValueFormatString: format,
                    labelAngle:  angle,
                    showInLegend: true,
                    dataPoints:dataPoints_1003  
            },
                {
                    name: "Sand Policing",
                    type: "stepLine",
                    axisYType: "secondary",
                    connectNullData: true,
                    xValueFormatString: format,
                    labelAngle:  angle,
                    showInLegend: true,
                    dataPoints:dataPoints_1004  
            },
                {
                    name: "WireRod",
                    type: "stepLine",
                    axisYType: "secondary",
                    connectNullData: true,
                    xValueFormatString: format,
                    labelAngle:  angle,
                    showInLegend: true,
                    dataPoints:dataPoints_1005  
            },
                {
                    name: "Wire Break",
                    type: "stepLine",
                    axisYType: "secondary",
                    connectNullData: true,
                    xValueFormatString: format,
                    labelAngle:  angle,
                    showInLegend: true,
                    dataPoints:dataPoints_1006  
            }]
    };
             //"chartContainer-2"
            var chart_1 = new CanvasJS.Chart("chartContainer-2", options_1);
            //var chart = new CanvasJS.Chart("chartContainer", options);
            //var startTime = new Date();
            //chart.render();
            chart_1.render();
            //var endTime = new Date();
            // document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
            // document.getElementById("load").innerHTML = "Total data points loaded: " + count  ;
    


}

function toggleDataSeries(e:any){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else{
		e.dataSeries.visible = true;
	}
	//var chart = new CanvasJS.Chart("chartContainer", options);
	e.chart.render();
    
}
    
    
    function addData(data_1:any) {
        console.log("pass 1");
    //    var getTheDate = new Date(data_1[0].date_time).toString().slice(3,13);
        //var getTheDate =  new Date(data_1[0].date_time).getTime();
        //console.log(getTheDate);
        var w : any  = 0;
        var m : any = [0,0,0,0];
        for (var i = 0; i < data_1.length; i++) {

            if (data_1[i].device_uid == "SL_LOG_1001" ){
            dataPoints_1001.push({
                x: new Date(data_1[i].date_time),
                y: Math.round(data_1[i].current)
                });    
            }   
            else if (data_1[i].device_uid == "SL_LOG_1002" ){
                dataPoints_1002.push({
                    x: new Date(data_1[i].date_time),
                    y: Math.round(data_1[i].current)
                    });    
                } 
            else if(data_1[i].device_uid == "SL_BRK_0003" )            {
              if (parseInt(data_1[i].voltage_N) == 1 && m[0] == 0 ){
                m[0] =  parseInt(data_1[i].voltage_N)
                dataPoints_1003.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                    indexLabel:"CO"
                  }); 
                }
                else{
                m[0] =  parseInt(data_1[i].voltage_N)
                  dataPoints_1003.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                  });}
            }
            else if(data_1[i].device_uid == "SL_BRK_0004" )            {
              if (parseInt(data_1[i].voltage_N) == 1 && m[1] == 0 ){
                m[1] =  parseInt(data_1[i].voltage_N)
                dataPoints_1004.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                    indexLabel:"Sand"
                  }); 
                }
                else{
                m[1] =  parseInt(data_1[i].voltage_N)
                  dataPoints_1004.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                  });}
            }
            else if(data_1[i].device_uid == "SL_BRK_0005" )
            {
              if (parseInt(data_1[i].voltage_N) == 1 && m[2] == 0 ){
                m[2] =  parseInt(data_1[i].voltage_N)
                dataPoints_1005.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                    indexLabel:"Rod"
                  }); 
                }
                else{
                m[2] =  parseInt(data_1[i].voltage_N)
                  dataPoints_1005.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                  });}
            }
            else if(data_1[i].device_uid == "SL_BRK_0006" ){
              
              if (parseInt(data_1[i].voltage_N) == 1 && m[3] == 0 ){
                m[3] =  parseInt(data_1[i].voltage_N)
                dataPoints_1006.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                    indexLabel:"wire"
                  }); 
                }
                else{
                m[3] =  parseInt(data_1[i].voltage_N)
                  dataPoints_1006.push({
                    x: new Date(data_1[i].date_time),
                    y: parseInt(data_1[i].voltage_N),
                  });}}


    }
//1001
        dataSeries_1001.dataPoints_1001 = dataPoints_1001;
        data_1001.push(dataSeries_1001);
        console.log(data_1001);
//1002
        dataSeries_1002.dataPoints_1002 = dataPoints_1002;
        data_1002.push(dataSeries_1002);
        console.log(data_1002);
//1003
        dataSeries_1003.dataPoints_1003 = dataPoints_1003;
        data_1003.push(dataSeries_1003);
        console.log(data_1003);
//1004
        dataSeries_1004.dataPoints_1004 = dataPoints_1004;
        data_1004.push(dataSeries_1004);
        console.log(data_1004);
//1005
        dataSeries_1005.dataPoints_1005 = dataPoints_1005;
        data_1005.push(dataSeries_1005);
        console.log(data_1005);
//1006
        dataSeries_1006.dataPoints_1006 = dataPoints_1006;
        data_1006.push(dataSeries_1006);
        console.log(data_1006);

        var   compare =  ((new Date(date_2).getTime()) - new Date(date_1).getTime());
        //console.log("compare" + compare);

        if  (compare<3600000){
            show("", 1 , "day" , "h:m TT| MMM DD" ,-45, data_1.length);return;
        }
        else{
            show("Data Between date "+date_1+" and "+date_2 , 1 , "day" , "h:m TT| MMM DD" ,-45, data_1.length);return;

        }

}

    function graph() {      

        if (new Date(date_1).getTime()- 3600000*5.5 > new Date().getTime()){
            console.log("at start");
            alert("Initial date entered cannot be greater than todays date ");
            return;
        } 

        if(new Date(date_2).getTime()- 3600000*5.5 > new Date().getTime()){
            alert("Final date entered cannot be greater than todays date ");return;
        }

        if (date_2.length<1){
            date_2 = new Date().toISOString().slice(0, 10); return;
        }
        if (date_1.length<1){
            date_1 = new Date().toISOString().slice(0, 10);return;
        }
        
        let url = "https://senselive.in/graph_swatej/custome_date.php/+"+ date_1 + "+" + date_2;
        console.log(url);
    
        $.getJSON(url, addData);

    }
    // const clearBox = () =>{
    //       this.MyDOMElement.nativeElement.innerHTML = "";

         graph();
    //     }
    //     clearBox();
    
}
  }





// import { Component, OnInit } from '@angular/core';
// import {Chart} from 'chart.js';
// import { ChartdataService } from '../chartdata.service';
// import { SharedService } from '../shared.service';
// @Component({
//   selector: 'app-sort-line',
//   templateUrl: './sort-line.component.html',
//   styleUrls: ['./sort-line.component.css']
// })
// export class SortLineComponent implements OnInit {

// //all day
// ChartData_all: any = [];
//   time_all: any  = [];
//   KVAh_all:any=[];
//   KVA_all:any=[];
//   KVAR_all:any=[];
//   KW_all:any=[]
//   KVAh_all_Data: any = [];

//   // Month
//   ChartData_M: any = [];
//   time_M: any  = [];
//   KVAh_M:any=[];
//   KVA_M:any=[];
//   KVAR_M:any=[];
//   KW_M:any=[]
//   KVAh_M_Data: any = [];
  
  
//   // Week
//   ChartData_W: any = [];
//   time_W: any  = [];
//   KVAh_W:any=[];
//   KVA_W:any=[];
//   KVAR_W:any=[];
//   KW_W:any=[]
//   KVAh_W_Data: any = [];
  
  
//   // Day
//   ChartData_D: any = [];
//   time_D: any  = [];
//   KVAh_D:any=[];
//   KVA_D:any=[];
//   KVAR_D:any=[];
//   KW_D:any=[]
//   KVAh_D_Data: any = [];

//   // Custom
//     startdate:any =[];
//     enddate:any=[];
//     indexstartdate:any=[];
//     indexenddate:any=[];
//     sort_date:any = [];
//     sort_date2:any = [];
//     svalue:any = [];
//     config:any;
//     filterDate:any;
//     filterDatapoints:any;
//     KVA_D_Data:any=[];
//     KVAR_D_Data:any=[];
//     KW_D_Data:any=[];

//     KVA_D_Data2:any=[];
//     KVAR_D_Data2:any=[];
//     KW_D_Data2:any=[];
  
//     [x: string]: any;
//   public chart: any;
  
  
//   constructor(public user: ChartdataService,private shared: SharedService) {
   
//   }
  
//   ngOnInit(): void {
//     if (this.shared.subsVar99 == undefined) {

//       //   // this.shared.subsVar991 = this.shared.invoketableFunction.subscribe( () => {
//       // const meterid1: any = localStorage.getItem("meterid3");
//       // // console.log("chart bar5 id",localStorage.getItem("meterid3"))
    
//       // this.bar5(meterid1);
    
//       this.clickEventSubscription = this.shared.getEvent2().subscribe((meterid: any) => {
//         this.x = meterid;
//         // console.log("meter line",this.x)
//         this.line(this.x);
       
    
//       })
    
//     }
  
//   }



//   line(meterid: string){

 
//     this.KVAh_D_Data=[];
//     this.KVAh_W_Data=[];
//     this.KVAh_M_Data=[];
//     this.KVAh_all_Data=[];

//     this.m_id = meterid;
//     console.log("id line graph", meterid)

//     this.user.getAllday(this.m_id).subscribe(res => {
//       this.ChartData_all =res;
//       console.log(this.ChartData_all,"line all")
//       this.time_all=[];
//       this.KVA_all=[];
//       this.KVAR_all=[];
//       this.KW_all=[]
//     });

//     this.user.getDataM(this.m_id).subscribe(res => {
//       this.ChartData_M =res;
//       console.log(this.ChartData_M,"line M")
//       this.time_M=[];
//       this.KVA_M=[];
//       this.KVAR_M=[];
//       this.KW_M=[]
//     });
    
    
    
//     this.user.getData(this.m_id).subscribe(res => {
//       this.ChartData_D =res;
//       console.log(this.ChartData_D,"line D")
//       this.KVA_D=[];
//       this.KVAR_D=[];
//       this.KW_D=[];
//       this.time_D=[];
//     });
  
//     this.user.getDataWeekbar(this.m_id).subscribe(res => {
//       this.ChartData_W =res;
//       console.log(this.ChartData_W,"line W")
//       this.time_W=[];
//       this.KVA_W=[];
//   this.KVAR_W=[];
//   this.KW_W=[]

//   setTimeout(() => {
    
//     this.getDataForChart();
//     this.createChart();
//   }, 800);
//     });
  
//     // for(let i = this.KVAh_D.length - 1; i>=0;i--){
//     //   this.KVAh_D_Data=[];
//     //   this.KVAh_D_Data.push(this.KVAh_D[i] - this.KVAh_D[i+1])
      
//     // };
   
    
//   }
  

//   getDataForChart(){

//     for(let i = this.ChartData_all.length - 1 ; i>=0;i--){
//       this.KVA_all.push(this.ChartData_all[i].kva); 
//       this.KVAR_all.push(this.ChartData_all[i].kvar); 
//       this.KW_all.push(this.ChartData_all[i].kw);     
//       this.time_all.push(this.ChartData_all[i].date_time);        
//       }
  
//       // this.time_D.shift();
//       // this.time_D.pop();
    
//       console.log("this is all day data",this.KVA_all);
//       console.log("this is all day labels",this.time_all);
  
//     for(let i = this.ChartData_D.length - 1 ; i>=0;i--){
//     this.KVA_D.push(this.ChartData_D[i].kva); 
//     this.KVAR_D.push(this.ChartData_D[i].kvar); 
//     this.KW_D.push(this.ChartData_D[i].kw);     
//     this.time_D.push(this.ChartData_D[i].date_time);        
//     }

//     // this.time_D.shift();
//     // this.time_D.pop();
  
//     console.log("this is day data",this.KVA_D);
//     console.log("this is day labels",this.time_D);
  
//     for(let i = this.ChartData_W.length - 1 ; i>=0;i--){
//       this.KVA_W.push(this.ChartData_W[i].kva); 
//     this.KVAR_W.push(this.ChartData_W[i].kvar); 
//     this.KW_W.push(this.ChartData_W[i].kw);     
//     this.time_W.push(this.ChartData_W[i].date_time);      
//     }

//     // this.time_W.pop();
//     console.log("this is week data",this.KVA_W);
//     console.log("this is week labels",this.time_W);
  
  
//     for(let i = this.ChartData_M.length - 1 ; i>=0;i--){
//     this.KVA_M.push(this.ChartData_M[i].kva); 
//     this.KVAR_M.push(this.ChartData_M[i].kvar); 
//     this.KW_M.push(this.ChartData_M[i].kw);     
//     this.time_M.push(this.ChartData_M[i].date_time);     
//     }
//     // this.time_M.shift();
//     // this.time_M.pop();
  
//     console.log("this is month data",this.KVA_M);
//     console.log("this is month labels",this.time_M);

//     this.time_M.reverse();
//     this.time_W.reverse();
//     this.time_D.reverse();
//     this.time_all.reverse();

//     this.KVA_D.reverse();
//     this.KVA_M.reverse();
//     this.KVA_W.reverse();
//     this.KVA_all.reverse();

//     this.KVAR_M.reverse();
//     this.KVAR_W.reverse();
//     this.KVAR_D.reverse();
//     this.KVAR_all.reverse();

//     this.KW_D.reverse();
//     this.KW_W.reverse();
//     this.KW_M.reverse();
//     this.KW_all.reverse();

//     var length = 10;
//     for(var i =0; i<this.time_M.length; i++){
//       this.sort_date[i]= this.time_M[i].substring(0, length);
//     }

//   }

//   sortall(){
  
//     this.chart.data.datasets[0].data = this.KVA_all;
//     this.chart.data.datasets[1].data = this.KVAR_all;
//     this.chart.data.datasets[2].data = this.KW_all;
//     this.chart.data.labels = this.time_all;
//     this.chart.update();
//   }

//   sortday(){
  
//     this.chart.data.datasets[0].data = this.KVA_D;
//     this.chart.data.datasets[1].data = this.KVAR_D;
//     this.chart.data.datasets[2].data = this.KW_D;
//     this.chart.data.labels = this.time_D;
//     this.chart.update();
//   }
  
//   sortweek(){  
//     this.chart.data.datasets[0].data = this.KVA_W;
//     this.chart.data.datasets[1].data = this.KVAR_W;
//     this.chart.data.datasets[2].data = this.KW_W;
//     this.chart.data.labels = this.time_W;
//     this.chart.update();
//   }
  
//   sortmonth(){ 
//     this.chart.data.datasets[0].data = this.KVA_M;
//     this.chart.data.datasets[1].data = this.KVAR_M;
//     this.chart.data.datasets[2].data = this.KW_M;
//     this.chart.data.labels = this.time_M;
//     this.chart.update();
//   }
//   filterData(){

//     this.sort_date2 = [...this.sort_date]
//     console.log(this.sort_date2);
//     // console.log(this.KVAh_D_Data);

 
//    this.startdate = document.getElementById('startdate');    
//    this.enddate = document.getElementById('enddate');


//    this.indexstartdate = this.sort_date2.indexOf(this.startdate.value);
//    this.indexenddate = this.sort_date2.indexOf(this.enddate.value);
   
   
//    console.log(this.indexstartdate);
//    console.log(this.indexenddate);

//    this.filterDate = this.sort_date2.slice(this.indexstartdate, this.indexenddate+1)
//    this.chart.config.data.labels = this.filterDate;


//   //  console.log(this.KVA_D);
//   //  console.log(this.KVAR_D);
//   //  console.log(this.KW_D);

//    this.KVA_D_Data = [...this.KVA_M]
//    this.KVAR_D_Data = [...this.KVAR_M]
//    this.KW_D_Data = [...this.KW_M]

//    console.log(this.KVA_D_Data);
//    console.log(this.KVAR_D_Data);
//    console.log(this.KW_D_Data);


   
//    this.KVA_D_Data2 = this.KVA_D_Data.slice(this.indexstartdate , this.indexenddate+1)
//    this.KVAR_D_Data2 = this.KVAR_D_Data.slice(this.indexstartdate , this.indexenddate+1)


//    this.KW_D_Data2 = this.KW_D_Data.slice(this.indexstartdate , this.indexenddate+1)

//    console.log(this.KVA_D_Data2,'ksdlfkhsakdhflasjdhflkaj');
//    console.log(this.KVAR_D_Data2,'ksdlfkhsakdhflasjdhflkaj');
//    console.log(this.KW_D_Data2,'ksdlfkhsakdhflasjdhflkaj');
   
//    this.chart.config.data.datasets[0].data = this.KVA_D_Data2;
//    this.chart.config.data.datasets[1].data = this.KVAR_D_Data2;
//    this.chart.config.data.datasets[2].data = this.KW_D_Data2;

//    this.chart.config.data.labels = this.sort_date2;


//    this.chart.update();
   

//  }

//  createChart(){
  
//   this.chart = new Chart("canvas100", {
//     type: 'line',
//     data: {
//       labels: this.time_M,
//       datasets: [
//         {
//           label: "KVA",
//           data: this.KVA_M,
//           backgroundColor: 'limegreen',
//           fill:false,
//           borderColor: 'limegreen'

//         },
//         {
//           label: "KVAR",
//           data: this.KVAR_M,
//           backgroundColor: '#00C7FF',
//           fill:false,
//           borderColor:'#00C7FF'

//         },
//         {
//           label: "KW",
//           data: this.KW_M,
//           backgroundColor: 'rgb(76, 117, 230)',
//           fill:false,
//           borderColor:'rgb(76, 117, 230)'

//         },

//       ]
//     },
//     options: {
//       aspectRatio:2.5
//       // maintainAspectRatio: false
//       // events: []
//     }
    
//   });
// }
  
//   }
  


  
