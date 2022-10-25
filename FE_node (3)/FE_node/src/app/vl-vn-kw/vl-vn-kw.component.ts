
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CommonModule } from '@angular/common';
import { CanvasJS } from '../canvasJs/canvasjs.angular.component';
import { SortweekComponent } from '../sortweek/sortweek.component';



function graph(title:any ,/*interval:any, intervaltype:any,*/ valueFormatString:any , xValueFormatString:any , url:any , deviceID :any , limit:any){
  $(document).ready(function () {

    var dataPoints_voltage_N: { x: Date; y: any; }[] = [];
    var dataPoints_Voltage_L: { x: Date; y: any; }[] = [];
    var dataPoints_KW: { x: Date; y: any; }[] = [];

var chartOptions = {
  zoomEnabled: true,
  animationEnabled: true,
  theme: "dark2",
  title: {
      text: title+"--" +deviceID,
  },axisX:{
      title: "--Time-->",
      gridThickness: 1,
      labelFontSize: 15,
    },
    axisY: {
      lineThickness: 1
  },
  toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: function(e: any){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else{
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
  },
  data: [{
    type:"line",
    name: " voltage_L",
    showInLegend: true,
    xValueFormatString    : xValueFormatString,
    dataPoints: dataPoints_Voltage_L
  },
  {
    type: "line",
    name: " voltage_N",
    showInLegend: true,
    xValueFormatString    : xValueFormatString,
    dataPoints: dataPoints_voltage_N
  },
  {
    type: "line",
    name:" KW",
    showInLegend: true,
    xValueFormatString    : xValueFormatString,
    dataPoints: dataPoints_KW
  }]
}	

      var chart = new CanvasJS.Chart("chartContainer_voltage", chartOptions);
      chart.render();

    function addData(data: string | any[]) {
      for (var i = 0; i < data.length; i++) {
        dataPoints_voltage_N.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].voltage_L)
        });
        dataPoints_Voltage_L.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].voltage_N)
        });
        dataPoints_KW.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].kw)
        });
      }
      console.log(dataPoints_KW);
      chart.render();
    }
    
    $.getJSON(url+"?d_id="+deviceID+"&limit="+limit, addData);
  })
}

        @Component({
          selector: 'app-vl-vn-kw',
          templateUrl: './vl-vn-kw.component.html',
          styleUrls: ['./vl-vn-kw.component.css']
        })
        
        
export class VlVnKwComponent implements OnInit {
    
    start:any = new Date()
    end:any = new Date()   
    
    ngOnInit() {
      //"http://localhost:3000/api/line/voltage?d_id=%27SL_LOG_1001%27+limit=32423"
      graph("30 Min",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage","SL_LOG_1001","360")   

      
    }
    
    
    public selectedOption: any  = "SL_LOG_1002";
    printedOption: any = String;
    selectedbuttons:any = "30 Minute";
    
    options = [
      { name: "SLM-14", value: "SL_LOG_1001" },
      { name: "SLM-15", value: "SL_LOG_1002" }
    ]
    
    
    select_ID(deviceID:string): void {
      this.selectedOption = deviceID;
      console.log(deviceID)
    }
    onSelected(value:string): void {
      this.selectedbuttons = value;
      console.log(value)
    }
    
    get_graph(){
      if (this.selectedbuttons == "30 Minute"){
        this.graph_30_min()
      }
      else if (this.selectedbuttons =="1 Hour" ){
        this.graph_1_HR()
      }
    else if (this.selectedbuttons =="12 Hour" ){
      this.graph_12_HR()
    }
    else if (this.selectedbuttons =="1 Day" ){
      this.graph_24_HR()
    }
    else if (this.selectedbuttons =="1 Week" ){
      this.graph_1_week()
    }
    else if (this.selectedbuttons =="1 Month" ){
      this.graph_1_month()
    }
    console.log("here ")
    
  }
  
  graph_30_min(){
    console.log(this.selectedOption);
    graph("30 Min",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage",this.selectedOption,"360")   
  }

  graph_1_HR(){
    graph("1 Hour",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage",this.selectedOption,"720")   
  }

  graph_12_HR(){
    graph("12 Hour",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage",this.selectedOption,"8461")   
  }

  graph_24_HR(){
    graph("1 Day",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage",this.selectedOption,"17280")   
  }

  graph_1_week(){
    graph("1 week",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage",this.selectedOption,"120960")   
  }

  graph_1_month(){
    graph("1 month",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage",this.selectedOption,"483840")   
  }

  
  calender(date_1:any = this.start , date_2:any = this.end ){
   //graph("1 month",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/4_week.php/+",this.select_ID())

    date_1 = date_1+":00";
    date_2 = date_2+":59";

    console.log(date_1);
    console.log(date_2);

    var dataPoints_voltage_N: { x: Date; y: any; }[] = [];
    var dataPoints_Voltage_L: { x: Date; y: any; }[] = [];
    var dataPoints_KW: { x: Date; y: any; }[] = [];

    
    function show(){
      var chartOptions_1 = {
        zoomEnabled: true,
        animationEnabled: true,
        theme: "dark2",
        title: {
            text: "Custom --" 
        },axisX:{
            title: "--Time-->",
            gridThickness: 1,
            labelFontSize: 15,
          },
          axisY: {
            lineThickness: 1
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function(e: any){
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else{
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: [{
          type:"line",
          name: " voltage_L",
          showInLegend: true,
          xValueFormatString    : "h:m:s TT| MMM DD",
          dataPoints: dataPoints_Voltage_L
        },
        {
          type: "line",
          name: " voltage_N",
          showInLegend: true,
          xValueFormatString    : "h:m:s TT| MMM DD",
          dataPoints: dataPoints_voltage_N
        },
        {
          type: "line",
          name:" KW",
          showInLegend: true,
          xValueFormatString    : "h:m:s TT| MMM DD",
          dataPoints: dataPoints_KW
        }]
      }	
      var chart = new CanvasJS.Chart("chartContainer_voltage", chartOptions_1);
      chart.render();
      
    }
      
  function Data(data: string | any[]) {
    for (var i = 0; i < data.length; i++) {
      dataPoints_voltage_N.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].voltage_N)
      });
      dataPoints_Voltage_L.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].voltage_L)
      });
      dataPoints_KW.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].kw)
      });
    }            
    show();
        
}

    const graph = () => {      

        if (new Date(date_1).getTime()- 3600000*5.5 > new Date().getTime()){
            console.log("at start");
            alert("Initial date entered cannot be greater than todays date ");
            return;
        } 

        if(new Date(date_2).getTime()- 3600000*5.5 > new Date().getTime()){
            alert("Final date entered cannot be greater than todays date ");return;
        }

        if (date_2.length<1){
            date_2 = new Date().toISOString().slice(0, 10);
        }
        if (date_1.length<1){
            date_1 = new Date().toISOString().slice(0, 10);
        }
        
        let url = "https://senselive.in/graph_swatej/custome_date.php/+voltage+"+this.selectedOption+"+"+ date_1 + "+" + date_2;
        console.log(url);
    
        $.getJSON(url, Data);

    }

         graph();

}
  }


  


  
