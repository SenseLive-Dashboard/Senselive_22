

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CommonModule } from '@angular/common';
import { CanvasJS } from '../canvasJs/canvasjs.angular.component';



function graph(graph_type:any , frame : any  ,xValueFormatString: any, graph:any ,device_id:any="EM6400NG03" , date:any ,limit:any  ){
  var dataPoints_KVAh_D: { label: any; y: any; }[] = [];
  var dataPoints_KWh_D: { label: any; y: any; }[] = [];
  var dataPoints_KVARh_D: { label: any; y: any; }[] = [];
  $(document).ready(function () {
    //var dataPoints_KVARh_R: { label: any; y: any; }[] = [];


    var chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      //theme: "dark2",
      title: {
      text: graph
      },
      axisX: {
      // labelAngle: -45,
      valueFormatString   : "h:m:s TT| MMM DD" ,
      },
      axisY: {
      title: ""    
      },
      axisY2: {
      title: ""
      },
      toolTip: {
      shared: true
      },
      legend:{
      cursor:"pointer",
      itemclick: function(e: any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
        }
        else {
        e.dataSeries.visible = true;
        }
        e.chart.render();
      }
      },
      data: [{
      type:graph_type,	
      name: "KVAh",
      legendText: "KVAh",
      showInLegend: true, 
      xValueFormatString    : xValueFormatString,
      dataPoints:dataPoints_KVAh_D
      }, {
      type: graph_type,	
      name: "KWh",
      legendText: "KWh",
      //axisYType: "secondary",
      showInLegend: true,
      xValueFormatString    : xValueFormatString,
      dataPoints:dataPoints_KWh_D
      },
      {
        type: graph_type,
        name: "kvarh",
        legendText: "kvarh",
        //axisYType: "secondary",
        xValueFormatString    : xValueFormatString,
        showInLegend: true,
        dataPoints:dataPoints_KVARh_D
        }
      
    
    ]})


    function addData(data: string | any[]) {
      // console.log("data_-------->>>>"+data[0].id)\
      for (var i =data.length-1; i >0; i--) {
        var day = (new Date(data[i].reading_time).toLocaleString('default', { month: 'short' }))+"-"+new Date(data[i].reading_time).getUTCDate()+"-"+new Date(data[i].reading_time).getFullYear()+"T"+new Date(data[i].reading_time).getUTCHours()+":"+new Date(data[i].reading_time).getUTCMinutes()
        dataPoints_KVAh_D.push({
          // label: (i)+" "+frame ,
          // label:new Date(data[i].reading_time),
          label :  day,
          y: Math.round( data[i-1].KVAh_D)-Math.round( data[i].KVAh_D)
        })
        dataPoints_KWh_D.push({
          // label: (i)+" "+frame ,
          // label:new Date(data[i].reading_time),
          label :  day,

          y: Math.round( data[i-1].KWh_D)-Math.round( data[i].KWh_D)
        })
        dataPoints_KVARh_D.push({
          // label: (i)+" "+frame ,
          // label:new Date(data[i].reading_time),
          label :  day,
          y: Math.round( data[i-1].KVARh_D)-Math.round( data[i].KVARh_D)
        })
        
      }
      console.log("data showinf ===>>>>",dataPoints_KVARh_D)
      chart.render();
      DownloadJSON2CSV(dataPoints_KVARh_D)
      function DownloadJSON2CSV(objArray:any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  
        var str = 'time_stamp,data,'+'\r\n';
  
        for (var i = 0; i < array.length; i++) {
          var line = '';
  
          for (var index in array[i]) {
            line += array[i][index] + ',';
          }
  
          line.slice(0, line.length - 1);
  
          str += line + '\r\n';
        }
        console.log(str)
       // downloadBlob(str, 'export.csv', 'text/csv;charset=utf-8;')
      }
    }
    var url = "http://localhost:3000/api/bar-graph/ayush?d_id="+device_id+"&date="+date+"&limit="+limit+"&frame="+frame
    console.log(url)
    $.getJSON(url, addData);
  })
}


@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.css']
})





export class SortBarComponent implements OnInit {
  start:any = new Date()
  end:any = new Date()
  graph_type:any = "column"
  graph_switch:boolean = false
  
  
  selectedOption: any = String;
  printedOption: any = String;
  selectedbuttons:any = "Day";
  
  options = [
    { name: "SLM-14", value: "SL_LOG_1002" },
    { name: "SLM-15", value: "SL_LOG_1001" }
  ]
  

  onSelected(value:string): void {
    this.selectedbuttons = value;
    console.log(value)
  }

get_graph(){
  if (this.selectedbuttons == "6-Months"){
    this.bar_half_year()
  }
  else if (this.selectedbuttons =="Month" ){
    this.bar_month()
  }
  else if (this.selectedbuttons =="Week" ){
    this.bar_week()
  }
  else if (this.selectedbuttons =="Day" ){
    this.bar_day()
  }

  console.log("here ")

}


select_ID(){
   if (this.selectedOption == "SL_LOG_1002")
     return("SL_LOG_1002");
   else  
     return("SL_LOG_1001")
 }
 
   ngOnInit(): void {
     //graph("line" ,"day" ,"barweek" ,"EM6400NG03" ,"2021-12-01");
     this.bar_day();
   }


  toggle(){
    if (this.graph_switch){
      this.graph_type = "column"}
    else{
      this.graph_type = "line"}
    this.graph_switch= !this.graph_switch    
    this.get_graph()
  }


  bar_half_year(){
    graph(this.graph_type ,"month" ,"h:m:s TT| MMM DD","Year" ,"EM6400NG03" ,"2021-12-01", 7);
  }
  bar_month(){
    graph(this.graph_type,"week" ,"h:m:s TT| MMM DD","Month" ,"EM6400NG03" ,"2021-12-01",5);
  }
  bar_week(){
    graph(this.graph_type,"day" ,"h:m:s TT| MMM DD","Week" ,"EM6400NG03" ,"2021-12-01",8);
  }  
  bar_day(){
    graph(this.graph_type,"hour","h:m:s TT| MMM DD" ,"Day" ,"EM6400NG03" ,"2021-12-01",25);
  }

}

