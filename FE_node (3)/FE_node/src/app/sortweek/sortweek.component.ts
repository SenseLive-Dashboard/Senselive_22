import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartdataService } from '../chartdata.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-sortweek',
  templateUrl: './sortweek.component.html',
  styleUrls: ['./sortweek.component.css']
})
export class SortweekComponent implements OnInit {

  public barChartOptions = {
    interaction: {
      intersect: false,
    },
    scaleShowVerticalLines: false,
    responsive: true,
    // events: [],
  };


  public barChartType: any = 'bar';
  public barChartLegend = true;


  // DAY
  ChartData_W: any = [];
  time_W: any = [];
  KVAh_W: any = []
  KVAh_W_Data: any = [];

  [x: string]: any;
  label: any = []
  public chart: any;
  short_date: any = [];


  constructor(public user: ChartdataService, private shared: SharedService) {
    setTimeout(() => {                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 3000);

  }

  ngOnInit(): void {

    if (this.shared.subsVar99 == undefined) {

      //   // this.shared.subsVar991 = this.shared.invoketableFunction.subscribe( () => {
      // const meterid1: any = localStorage.getItem("meterid3");
      // // console.log("chart bar5 id",localStorage.getItem("meterid3"))

      // this.bar5(meterid1);

      this.clickEventSubscription = this.shared.getEvent().subscribe((meterid: any) => {
        this.x = meterid;

        this.bar5(this.x);

      })

    }
    this.chartbar();
  };


  bar5(meterid: string) {
    this.m_id = meterid;
    console.log("week main graph", meterid)
    this.user.getDataWeekbar(this.m_id).subscribe(res => {
      this.ChartData_W = res;
      // console.log(this.ChartData_W);
      this.sortday();

      this.KVAh_W = [];

      this.KVAh_W_Data = [];

      this.time_W = [];

      this.short_date = [];

      return this.ChartData_W;
    });
  }

  sortday() {

    for (let i = this.ChartData_W.length - 1; i >= 0; i--) {
      this.KVAh_W.push(this.ChartData_W[i].KVAh_D);

      this.time_W.push(this.ChartData_W[i].reading_time);

    }

    for (let i = this.KVAh_W.length - 1; i >= 0; i--) {
      this.KVAh_W_Data.push(this.KVAh_W[i] - this.KVAh_W[i + 1])

    };

    this.KVAh_W_Data = this.KVAh_W_Data.map(function (each_element: number) {
      return Number(each_element.toFixed(1));
    });




    
    
    
    var length = 10;
    
    for (var i = 0; i < this.time_W.length; i++) {
      this.short_date[i] = this.time_W[i].substring(0, length); // formatted date according to requirement
    }
    
    
    
    
    
    this.short_date.reverse();
    this.short_date.pop();
    
    // console.log(this.short_date)
    this.barChartLabels = this.short_date;
    
    this.KVAh_W_Data.reverse();
    this.KVAh_W_Data.pop();
    // console.log(this.KVAh_W_Data);
    this.chartbar();
  }
 
  chartbar(){
    this.chart = new Chart("canvas", {
      type: 'bar',
      data: {
        labels: this.short_date,
        datasets: [
          {
            label: "KVAH_W",
            data: this.KVAh_W_Data,
            backgroundColor: 'limegreen',
            fill: false
  
          }
  
        ]
      },
      options: {
        maintainAspectRatio: false
        // events: []
      }
  
    });
    return;
  }

  // barChartData = [{
  //   data: this.KVAh_W_Data,
  //   label: 'KVAH',
  //   fill:true,
  //   backgroundColor: "limegreen",
  //   borderColor: 'limegreen',
    
    
    

  // }
  // ];
  // barChartLabels = [this.short_date]

}

