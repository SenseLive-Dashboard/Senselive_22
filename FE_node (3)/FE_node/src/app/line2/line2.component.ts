

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CommonModule } from '@angular/common';
import { CanvasJS } from '../canvasJs/canvasjs.angular.component';


function graph(graph_type:any , frame : any =  "day" , graph:any ,device_id:any="EM6400NG03" , date:any="2021-12-01"  ){
  $(document).ready(function () {
    var dataPoints_KVAh_D: { label: any; y: any; }[] = [];
    var dataPoints_KWh_D: { label: any; y: any; }[] = [];
    var dataPoints_KVARh_D: { label: any; y: any; }[] = [];
    //var dataPoints_KVARh_R: { label: any; y: any; }[] = [];


    var chart = new CanvasJS.Chart("overview_bar_chart", {
      animationEnabled: true,
      theme: "dark2",
      title: {
      text: ""
      },
      axisX: {
      labelAngle: -90
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
      dataPoints:dataPoints_KVAh_D
      }, {
      type: graph_type,	
      name: "KWh",
      legendText: "KWh",
      //axisYType: "secondary",
      showInLegend: true,
      dataPoints:dataPoints_KWh_D
      },
      {
        type: graph_type,
        name: "kvarh",
        legendText: "kvarh",
        //axisYType: "secondary",
        showInLegend: true,
        dataPoints:dataPoints_KVARh_D
        }
    ]})

    function addData(data: string | any[]) {
      console.log("data_-------->>>>"+data[0].id)
      for (var i =data.length-1; i >0; i--) {
        dataPoints_KVAh_D.push({
          label: (i)+" "+frame ,
          y: Math.round( data[i-1].KVAh_D)-Math.round( data[i].KVAh_D)
        })
        dataPoints_KWh_D.push({
          label: (i)+" "+frame ,
          y: Math.round( data[i-1].KWh_D)-Math.round( data[i].KWh_D)
        })
        dataPoints_KVARh_D.push({
          label: (i)+" "+frame ,
          y: Math.round( data[i-1].KVARh_D)-Math.round( data[i].KVARh_D)
        })
        
        console.log(Math.round( data[i].KVAh_D))
      }
      // console.log(dataPoints_KVAh_D)
      // console.log(dataPoints_KWh_D)
      // console.log(dataPoints_KVARh_D)
      chart.render();
    }
  
    $.getJSON("http://localhost:3000/api/"+graph+"/3292ayush?d_id="+device_id+"&date="+date, addData);
  })
}

@Component({
  selector: 'app-line2',
  templateUrl: './line2.component.html',
  styleUrls: ['./line2.component.css']
})

export class Line2Component implements OnInit {

ngOnInit(): void {
  //graph("line" ,"day" ,"barweek" ,"EM6400NG03" ,"2021-12-01");
  //this.bar_day();
  graph("column","day" ,"barweek" ,"EM6400NG03" ,"2021-12-01");  
}
}