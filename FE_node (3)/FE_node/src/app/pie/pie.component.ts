import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { ChartdataService } from '../chartdata.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  public myChart: any;
  
  
  constructor(public user: ChartdataService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 30);
  
  }
  
  ngOnInit(): void {
    this.createChart();
  //   this.user.getDataM().subscribe(res => {
  //   // this.ChartData_M =res;
    
  // });

  
  }
  
  createChart(){
  console.log('helloe');
  // setup 
  const data = {
    labels: ['Meter1', 'Meter2', 'Meter3', 'Meter4', 'Meter5', 'Meter6', 'Meter7'],
    datasets: [{
      label: 'Weekly data',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  };

  // config 
  const config = {
    type: 'bar',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // render init block
   this.myChart = new Chart("myChart", {
    type: 'pie',
    data,
    options: {
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  }
  );


  }


}
