import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CommonModule } from '@angular/common';
import { CanvasJS } from '../canvasJs/canvasjs.angular.component';



function graph(title:any ,/*interval:any, intervaltype:any,*/ valueFormatString:any , xValueFormatString:any , url:any , deviceID:any,limit:any){
$(document).ready(function () {
  //
  //
        var datapoints_current: { x: Date; y: any; }[] = [];
        var datapoints_voltage_N: { x: Date; y: any; }[] = [];
        var datapoints_voltage_L: { x: Date; y: any; }[] = [];

        var datapoints_KW: { x: Date; y: any; }[] = [];
        var datapoints_kwh: { x: Date; y: any; }[] = [];

        var datapoints_pf: { x: Date; y: any; }[] = [];
        var dataPoints_freq: { x: Date; y: any; }[] = [];

        var dataPoints_kva: { x: Date; y: any; }[] = [];
        var dataPoints_kvah: { x: Date; y: any; }[] = [];
        
        var dataPoints_kvar: { x: Date; y: any; }[] = [];
        var dataPoints_imp_kvarh: { x: Date; y: any; }[] = [];

  //
  //
  var chart = new CanvasJS.Chart("chartContainer", {
    //theme: "dark2",
    zoomEnabled: true,
    animationEnabled: true,
    //theme: "dark2",
    title: {
            text                : title
    },axisX : {
            scale               : "1:5 min",
            title               : "--Time-->",
            gridThickness       : 1,
            valueFormatString   : valueFormatString ,
            labelFontSize       : 10
      },axisY: {
             lineThickness      : 1
    },toolTip:{
            shared              : true
     },
    legend: {
      cursor: "pointer",
      itemclick: function (e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {

        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [
                    {
                      //lineColor             :"red",
                      name                  : "current",
                      type                  : "line",
                      connectNullData       : true,
                      xValueFormatString    : xValueFormatString,
                      showInLegend: true,
                      dataPoints            : datapoints_current
                  },
                  {
                    //lineColor             :"red",
                    name                  : "voltage_N",
                    type                  : "line",
                    connectNullData       : true,
                    xValueFormatString    : xValueFormatString,
                    showInLegend: true,
                    dataPoints            : datapoints_voltage_N
                },
                {
                  //lineColor             :"red",
                  name                  : "voltage_L",
                  type                  : "line",
                  connectNullData       : true,
                  xValueFormatString    : xValueFormatString,
                  showInLegend: true,
                  dataPoints            : datapoints_voltage_L
              },


              {
                //lineColor             :"red",
                name                  : "KW",
                type                  : "line",
                connectNullData       : true,
                xValueFormatString    : xValueFormatString,
                showInLegend: true,
                dataPoints            : datapoints_KW
              },
              {
                //lineColor             :"red",
                name                  : "Kwh",
                type                  : "line",
                connectNullData       : true,
                xValueFormatString    : xValueFormatString,
                showInLegend: true,
                dataPoints            : datapoints_kwh
            },


            {
              //lineColor             :"red",
              name                  : "pf",
              type                  : "line",
              connectNullData       : true,
              xValueFormatString    : xValueFormatString,
              showInLegend: true,
              dataPoints            : datapoints_pf
          },
          {
            //lineColor             :"red",
            name                  : "freq",
            type                  : "line",
            connectNullData       : true,
            xValueFormatString    : xValueFormatString,
            showInLegend: true,
            dataPoints            : dataPoints_freq
        },
        {
          //lineColor             :"red",
          name                  : "kva",
          type                  : "line",
          connectNullData       : true,
          xValueFormatString    : xValueFormatString,
          showInLegend: true,
          dataPoints            : dataPoints_kva
        },
        {
          //lineColor             :"red",
          name                  : "kvah",
          type                  : "line",
          connectNullData       : true,
          xValueFormatString    : xValueFormatString,
          showInLegend: true,
          dataPoints            : dataPoints_kvah
      },
      {
        //lineColor             :"red",
        name                  : "kvar",
        type                  : "line",
        connectNullData       : true,
        xValueFormatString    : xValueFormatString,
        showInLegend: true,
        dataPoints            : dataPoints_kvar
    },
    {
      //lineColor             :"red",
      name                  : "imp_kvarh",
      type                  : "line",
      connectNullData       : true,
      xValueFormatString    : xValueFormatString,
      showInLegend: true,
      dataPoints            : dataPoints_imp_kvarh
    }
  ]

  });
  function addData(data: string | any[]) {
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      datapoints_current.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].current)
      });
      datapoints_voltage_N.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].voltage_N)
      });
      datapoints_voltage_L.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].voltage_L)
      });


      datapoints_KW.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].kw)
      });
      datapoints_kwh.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].kwh)
      });


      datapoints_pf.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].pf)
      });
      dataPoints_freq.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].freq)
      });


      dataPoints_kva.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].kva)
      });
      dataPoints_kvah.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].kvah)
      });
      dataPoints_kvar.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].kvar)
      });
      dataPoints_imp_kvarh.push({
        x: new Date(data[i].date_time),
        y: Math.round( data[i].imp_kvarh)
      });

    }
    chart.render();
  
  }
  console.log(url+"?d_id="+deviceID+"&limit="+limit)
  $.getJSON(url+"?d_id="+deviceID+"&limit="+limit, addData);
})
}

@Component({
  selector: 'app-sort-line',
  templateUrl:'./sort-line.component.html',
  styleUrls: ['./sort-line.component.css']
})


export class SortLineComponent implements OnInit {

  ngOnInit() {
    //graph("30 Min",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/voltage","SL_LOG_1001","360")   
    this.graph_30_min()
  }
  
    start:any = new Date()
    end:any = new Date()
    

    selectedOption: any  = "SL_LOG_1001";
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
    graph("30 Min",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/current",this.selectedOption,"360")   
  }

  graph_1_HR(){
    graph("1 Hour",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/current",this.selectedOption,"720")   
  }

  graph_12_HR(){
    graph("12 Hour",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/current",this.selectedOption,"8461")   
  }

  graph_24_HR(){
    graph("1 Day",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/current",this.selectedOption,"17280")   
  }

  graph_1_week(){
    graph("1 week",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/current",this.selectedOption,"120960")   
  }

  graph_1_month(){
    graph("1 month",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","http://localhost:3000/api/line/current",this.selectedOption,"483840")   
  }

  calender(date_1:any = this.start , date_2:any = this.end , selectedOption :any = this.selectedOption){
   //graph("1 month",/*3,"minute",*/ "HH:mm TT | MMM DD","h:m:s TT| MMM DD","https://senselive.in/graph_swatej/Test_graph/test-Api's/4_week.php/+",this.select_ID())

    date_1 = date_1+":00";
    date_2 = date_2+":59";

    console.log(date_1);
    console.log(date_2);

    var options :any = {};

        var datapoints_current: { x: Date; y: any; }[] = [];
        var datapoints_voltage_N: { x: Date; y: any; }[] = [];
        var datapoints_voltage_L: { x: Date; y: any; }[] = [];

        var datapoints_KW: { x: Date; y: any; }[] = [];
        var datapoints_kwh: { x: Date; y: any; }[] = [];

        var datapoints_pf: { x: Date; y: any; }[] = [];
        var dataPoints_freq: { x: Date; y: any; }[] = [];

        var dataPoints_kva: { x: Date; y: any; }[] = [];
        var dataPoints_kvah: { x: Date; y: any; }[] = [];
        
        var dataPoints_kvar: { x: Date; y: any; }[] = [];
        var dataPoints_imp_kvarh: { x: Date; y: any; }[] = [];

    function show(name:any , inter:any , type:any , format:any , angle:any ,  count:any ){
            console.log("i am hetre "+ name + " + " , inter + " + ",type+ " + ",format);
            options = {
                zoomEnabled: true,
                animationEnabled: true,
                //theme: "dark2",
                title: {
                    text:  selectedOption+" "+  new Date(date_1).toLocaleString('default', { month: 'short' })+" "+new Date(date_1).getDate()+" To "+new Date(date_2).toLocaleString('default', { month: 'short' })+" "+new Date(date_2).getDate()
                },
                axisX:{
                    title: "--Time-->",
                    gridThickness: 1,
//                    labelAngle:  angle,
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
                data : [
                  {
                    //lineColor             :"red",
                    name                  : "current",
                    type                  : "line",
                    connectNullData       : true,
                    xValueFormatString    : format,
                    showInLegend: true,
                    dataPoints            : datapoints_current
                },
                {
                  //lineColor             :"red",
                  name                  : "voltage_N",
                  type                  : "line",
                  connectNullData       : true,
                  xValueFormatString    : format,
                  showInLegend: true,
                  dataPoints            : datapoints_voltage_N
              },
              {
                //lineColor             :"red",
                name                  : "voltage_L",
                type                  : "line",
                connectNullData       : true,
                xValueFormatString    : format,
                showInLegend: true,
                dataPoints            : datapoints_voltage_L
            },


            {
              //lineColor             :"red",
              name                  : "KW",
              type                  : "line",
              connectNullData       : true,
              xValueFormatString    : format,
              showInLegend: true,
              dataPoints            : datapoints_KW
            },
            {
              //lineColor             :"red",
              name                  : "Kwh",
              type                  : "line",
              connectNullData       : true,
              xValueFormatString    : format,
              showInLegend: true,
              dataPoints            : datapoints_kwh
          },


          {
            //lineColor             :"red",
            name                  : "pf",
            type                  : "line",
            connectNullData       : true,
            xValueFormatString    : format,
            showInLegend: true,
            dataPoints            : datapoints_pf
        },
        {
          //lineColor             :"red",
          name                  : "freq",
          type                  : "line",
          connectNullData       : true,
          xValueFormatString    : format,
          showInLegend: true,
          dataPoints            : dataPoints_freq
      },
      {
        //lineColor             :"red",
        name                  : "kva",
        type                  : "line",
        connectNullData       : true,
        xValueFormatString    : format,
        showInLegend: true,
        dataPoints            : dataPoints_kva
      },
      {
        //lineColor             :"red",
        name                  : "kvah",
        type                  : "line",
        connectNullData       : true,
        xValueFormatString    : format,
        showInLegend: true,
        dataPoints            : dataPoints_kvah
    },
    {
      //lineColor             :"red",
      name                  : "kvar",
      type                  : "line",
      connectNullData       : true,
      xValueFormatString    : format,
      showInLegend: true,
      dataPoints            : dataPoints_kvar
  },
  {
    //lineColor             :"red",
    name                  : "imp_kvarh",
    type                  : "line",
    connectNullData       : true,
    xValueFormatString    : format,
    showInLegend: true,
    dataPoints            : dataPoints_imp_kvarh
  }
]
    };
    var chart = new CanvasJS.Chart("chartContainer", options);
    chart.render();
}

      function toggleDataSeries(e:any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else{
          e.dataSeries.visible = true;
        }
        e.chart.render(); 
      }
    
    
    function addData(data:any) {

      console.log(data.length);        
      for (var i = 0; i < data.length; i++) {
        datapoints_current.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].current)
        });
        datapoints_voltage_N.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].voltage_N)
        });
        datapoints_voltage_L.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].voltage_L)
        });
  
  
        datapoints_KW.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].kw)
        });
        datapoints_kwh.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].kwh)
        });
  
  
        datapoints_pf.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].pf)
        });
        dataPoints_freq.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].freq)
        });
  
  
        dataPoints_kva.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].kva)
        });
        dataPoints_kvah.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].kvah)
        });
        dataPoints_kvar.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].kvar)
        });
        dataPoints_imp_kvarh.push({
          x: new Date(data[i].date_time),
          y: Math.round( data[i].imp_kvarh)
        });
  
      }


        var   compare =  ((new Date(date_2).getTime()) - new Date(date_1).getTime());

        if  (compare<3600000){
            show("", 1 , "day" , "h:m TT| MMM DD" ,-45, data.length);return;
        }
        else{
            show("Data Between date "+date_1+" and "+date_2 , 1 , "day" , "h:m TT| MMM DD" ,-45, data.length);return;
        }

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
            date_2 = new Date().toISOString().slice(0, 10); return;
        }
        if (date_1.length<1){
            date_1 = new Date().toISOString().slice(0, 10);return;
        }
        
        let url = "http://localhost:3000/api/line/date?type=current&d_id="+this.selectedOption+"&d1="+ date_1 + "&d2=" + date_2 ;

        //let url = "https://senselive.in/graph_swatej/custome_date.php/+current+SL_LOG_1002+"+ date_1 + "+" + date_2;
        console.log(url);
    
        $.getJSON(url, addData);

    }

    graph();

    
}
  }



