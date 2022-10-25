import { Component, OnInit } from '@angular/core';
import { ChartdataService } from '../chartdata.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar3',
  templateUrl: './bar3.component.html',
  styleUrls: ['./bar3.component.css']
})
export class Bar3Component implements OnInit {

  svg: any;
  svgD: any;
  margin = 50;
  width = 400 - (this.margin * 2);
  height = 300 - (this.margin * 2);

  ChartData: any = [];
  devisor = 1000;

  // Month Variables
  KVAH_DataM: any = [];
  KVAH_DM: any = [];
  timeM: any = [];

  // Week Variables
  KVAH_DataW: any = [];
  KVAH_DW: any = [];
  timeW: any = [];

  // Day Variables
  KVAH_DataD: any = [];
  KVAH_DD: any = [];
  timeD: any = [];
  [x: string]: any;
  a: string | undefined;
  time: any = [];
  short_date: any = [];
  clickEventSubscription!: Subscription;
  title:any;
  constructor(public user: ChartdataService, private shared: SharedService) {
    // setTimeout(() => {                           // <<<---using ()=> syntax
    //   // this.messageSuccess = false;
    // }, 3000);
    

  }

  ngOnInit(): void {
    this.createSvg();
    // this.drawBarsW(this.ChartData)

    if (this.shared.subsVar99 == undefined) {

    //   // this.shared.subsVar991 = this.shared.invoketableFunction.subscribe( () => {
      const meterid1: any = localStorage.getItem("meterid3");
      // console.log("chart local id",localStorage.getItem("meterid3"))
      this.chart(meterid1);
      
      // this.clickEventSubscription= this.shared.getEvent().subscribe((meterid: any)=>{
      //   // console.log("vsdgs",meterid)
      //   this.chart(meterid);
        
      // })
    //   // });
    }
    // this.createSvgD()
    //       this.user.getData().subscribe(res => {
    //         this.ChartData =res;
    //         this.KVAh_D();
    //         // this.drawBarsM(this.ChartData)
    // this.drawBarsW(this.ChartData)

    //      });
    
  }
  chart(meterid: string) {
    this.title="KVAH";
    this.m_id = meterid;
    // console.log("chart id", this.m_id)
    this.user.getData(this.m_id).subscribe((response) => {
      this.ChartData = response;
      //  console.log("chart data",this.ChartData);

      this.KVAh_D();
      //  console.log(this.KWh_Data);

      //  this.createSvg();
      this.drawBarsW(this.ChartData)
      //  this.drawBars(this.ChartData);
      return this.ChartData;
    });
  }


  KVAh_D() {

    ////////////////////For Month///////////////////////////
    ////////////////////For Month///////////////////////////
    ////////////////////For Month///////////////////////////
    for (let i = this.ChartData.length - 1; i >= 0; i -= 117) {
      // this.KWh_D1.push((this.ChartData[i].KVAH_D) - (this.ChartData[i-1].KVAH_D));
      this.KVAH_DM.push(this.ChartData[i].KVAh_D);
    }

    for (let i = this.ChartData.length - 1; i >= 0; i -= 117) {
      this.timeM.push(this.ChartData[i].reading_time);
    }
    // this.timeM.shift();

    for (let i = 0; i < this.KVAH_DM.length; i++) {
      this.KVAH_DataM.push(this.KVAH_DM[i] / this.devisor - this.KVAH_DM[i + 1] / this.devisor);

    }

    // console.log(this.KVAH_DataM);
    // console.log(this.KVAH_DM);
    // console.log(this.timeM);

    ////////////////////For Week///////////////////////////
    ////////////////////For Week///////////////////////////
    ////////////////////For Week///////////////////////////

    for (let i = this.ChartData.length - 1; i >= 0; i -= 24) {
      // this.KWh_D1.push((this.ChartData[i].KVAH_D) - (this.ChartData[i-1].KVAH_D));
      this.KVAH_DW.push(this.ChartData[i].KVAh_D)
      this.KVAH_DW.splice(7);
    }

    for (let i = this.ChartData.length - 1; i >= 0; i -= 24) {
      
      this.timeW.push(this.ChartData[i].reading_time)
      this.timeW.splice(7);

    }
    // console.log("timing before", this.timeW);

    var length = 10;
    for (var i = 0; i < this.timeW.length; i++) {
      this.short_date[i] = this.timeW[i].substring(0, length); // formatted date according to requirement
    }
    // console.log("time after", this.short_date);

    for (let i = 0; i < this.KVAH_DW.length; i++) {
      this.KVAH_DataW.push(this.KVAH_DW[i] / 100 - this.KVAH_DW[i + 1] / 100);

    }
    this.KVAH_DataW.pop()
    // console.log();
    console.log("b3 data",this.KVAH_DW);
    console.log("b3 time",this.timeW);

    ////////////////////For Day///////////////////////////
    ////////////////////For Day///////////////////////////
    ////////////////////For Day///////////////////////////

    for (let i = this.ChartData.length - 1; i >= 0; i -= 8) {
      // this.KWh_D1.push((this.ChartData[i].KVAH_D) - (this.ChartData[i-1].KVAH_D));
      this.KVAH_DD.push(this.ChartData[i].KVAh_D)
      this.KVAH_DD.splice(4);

    }

    for (let i = this.ChartData.length - 1; i >= 0; i -= 8) {
      this.timeD.push(this.ChartData[i].reading_time)
      this.timeD.splice(3);

    }

    for (let i = 0; i < this.KVAH_DD.length; i++) {
      this.KVAH_DataD.push(this.KVAH_DD[i] / 100 - this.KVAH_DD[i + 1] / 100);

    }
    // console.log(this.KVAH_DataD);
    // console.log(this.KVAH_DD);
    // console.log(this.timeD);


  }

  createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  createSvgD(): void {
    this.svgD = d3.select("figure.barD")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  drawBarsM(data: any[]): void {

    // Create the X-axis band scsale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.timeM)
      .padding(-0.1);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(-10," + (this.height - 50) + ")")
      .data(this.timeM)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([30000, 100000])

      .range([this.height, 50]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y))
      .attr("transform", "translate(-10," + -50 + ")");


    this.svg.selectAll("rect")
      .data(this.KVAH_DataM)
      .enter()
      .append("rect")
      .attr("x", (d: any, i: number) => i * 80)
      .attr("y", (d: number, i: any) => 150 - 1 * d)
      .attr("width", 50)
      .attr("height", (d: number, i: any) => 1 * d)
      .attr("fill", "red")
      .attr("class", "bar1");

  }

  drawBarsW(data: any[]): void {

    // Create the X-axis band scsale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.short_date)
      .padding(-0.1);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(-10," + (this.height - 50) + ")")
      .data(this.short_date)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([30000, 90000])

      .range([this.height, 50]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y))
      .attr("transform", "translate(-10," + -50 + ")");


    this.svg.selectAll("rect")
      .data(this.KVAH_DataW)
      .enter()
      .append("rect")
      .attr("x", (d: any, i: number) => i * 50)
      .attr("y", (d: number, i: any) => 150 - 1 * d)
      .attr("width", 40)
      .attr("height", (d: number, i: any) => 1 * d)
      .attr("fill", "limegreen")
      .attr("class", "bar1");

  }

  drawBarsD(data: any[]): void {

    // Create the X-axis band scsale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.timeD)
      .padding(-0.1);

    // Draw the X-axis on the DOM
    this.svgD.append("g")
      .attr("transform", "translate(-10," + (this.height - 50) + ")")
      .data(this.timeD)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([1000, 10000])

      .range([this.height, 80]);

    // Draw the Y-axis on the DOM
    this.svgD.append("g")
      .call(d3.axisLeft(y))
      .attr("transform", "translate(-10," + -50 + ")");


    this.svgD.selectAll("rect")
      .data(this.KVAH_DataD)
      .enter()
      .append("rect")
      .attr("x", (d: any, i: number) => i * 100)
      .attr("y", (d: number, i: any) => 150 - 1 * d)
      .attr("width", 50)
      .attr("height", (d: number, i: any) => 1 * d)
      .attr("fill", "steelblue")
      .attr("class", "bar1");

  }




}
