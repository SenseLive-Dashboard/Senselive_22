

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CanvasJS } from '../canvasJs/canvasjs.angular.component';


function graph(graph_type:any , frame : any =  "day" , graph:any ,device_id:any="EM6400NG03" , date:any="2021-12-01"  ){
  $(document).ready(function () {
    var dataPoints_KVA: { label: any; y: any; }[] = [];
    var dataPoints_KW: { label: any; y: any; }[] = [];
    var dataPoints_KVAR: { label: any; y: any; }[] = [];
    //var dataPoints_KVARh_R: { label: any; y: any; }[] = [];


    var chart = new CanvasJS.Chart("overview_line_chart", {
      animationEnabled: true,
      //theme: "dark2",
      title: {
      text: ""
      },
      axisX: {
      // labelAngle: -90
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
      name: "KVA",
      legendText: "KVA",
      showInLegend: true, 
      dataPoints:dataPoints_KVA
      }, {
      type: graph_type,	
      name: "KWh",
      legendText: "KWh",
      //axisYType: "secondary",
      showInLegend: true,
      dataPoints:dataPoints_KW
      },
      {
        type: graph_type,
        name: "kvar",
        legendText: "kvar",
        //axisYType: "secondary",
        showInLegend: true,
        dataPoints:dataPoints_KVAR
        }
    ]})

    function addData(data: string | any[]) {
      //console.log("data_-------->>>>"+data[0].id)
      for (var i =data.length-1; i >0; i--) {
        var day = (new Date(data[i].reading_time).toLocaleString('default', { month: 'short' }))+"-"+new Date(data[i].reading_time).getUTCDate()+"-"+new Date(data[i].reading_time).getFullYear()+"T"+new Date(data[i].reading_time).getUTCHours()+":"+new Date(data[i].reading_time).getUTCMinutes()
        dataPoints_KVA.push({
          // label: (i)+" "+frame ,
          label :  day,
          y: Math.round( data[i].KVA)
        })
        dataPoints_KW.push({
          // label: (i)+" "+frame ,
          label :  day,
          y: Math.round( data[i].Kw)
        })
        dataPoints_KVAR.push({
          // label: (i)+" "+frame ,
          label :  day,
          y: Math.round( data[i].KVAR)
        })
        
        console.log(Math.round( data[i].KVA))
      }
      // console.log(dataPoints_KVA)
      // console.log(dataPoints_KW)
      // console.log(dataPoints_KVAR)
      chart.render();
    }
    
    console.log("http://localhost:3000/api/"+graph+"/line?d_id="+device_id+"&date="+date+"&frame=day&limit=25")
    $.getJSON("http://localhost:3000/api/"+graph+"/line?d_id="+device_id+"&date="+date+"&frame=day&limit=25", addData);
  
  })
}



@Component({
  selector: 'app-overview-line',
  templateUrl: './overview-line.component.html',
  styleUrls: ['./overview-line.component.css']
})
export class OverviewLineComponent implements OnInit {
  ngOnInit(): void {
    //graph("line" ,"day" ,"barweek" ,"EM6400NG03" ,"2021-12-01");
    //this.bar_day();
    graph("line","day" ,"bar-graph" ,"EM6400NG03" ,"2021-11-01");  
  }

}
