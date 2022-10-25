import { Component, OnInit } from '@angular/core';
import { ChartdataService } from '../chartdata.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-bar5',
  templateUrl: './bar5.component.html',
  styleUrls: ['./bar5.component.css']
})
export class Bar5Component implements OnInit {

  
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];

  
  svg:any;
  margin = 70;
  width = 400 - (this.margin * 2);
  height = 310 - (this.margin * 2);


  ChartData:any=[];


  // Week Variables
  KVAH_DataW:any = [];
  KVAH_DW:any = [];
  timeW: any = [];
  title: any;
  [x: string]: any;
  




  


  constructor(public user: ChartdataService,private shared: SharedService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
    }, 3000);

  }

  ngOnInit(): void {

   
   if (this.shared.subsVar99 == undefined) {

    //   // this.shared.subsVar991 = this.shared.invoketableFunction.subscribe( () => {
      const meterid1: any = localStorage.getItem("meterid3");
      // console.log("chart bar5 id",localStorage.getItem("meterid3"))
      
      this.bar5(meterid1);

      // this.clickEventSubscription= this.shared.getEvent().subscribe((meterid: any)=>{
      //   console.log("bar5 chart",meterid)
        
      //     this.bar5(meterid);
        
        
        
      // })

      
    //   // });
    }

  }

  bar5(meterid:string){
    this.m_id=meterid;
    console.log("bar5 chart",meterid)
    this.user.getDataWeekbar(this.m_id).subscribe(res => {
     
      this.ChartData =res;
      // console.log("bar5 chart data",this.ChartData)
      this.title="KVAH";
      this.KVAh_D();
      this.createSvg();
      this.drawBars();

   });
  }


  KVAh_D(){
    ////////////////////For Month///////////////////////////
    ////////////////////For Month///////////////////////////
    ////////////////////For Month///////////////////////////
    for(let i = this.ChartData.length - 1 ; i>=0;i--){
      // this.KWh_D1.push((this.ChartData[i].KVAH_D) - (this.ChartData[i-1].KVAH_D));
      this.KVAH_DW.push(this.ChartData[i].KVAh_D);         
    }

    for(let i = this.ChartData.length - 1; i>=0;i--){
      this.timeW.push(this.ChartData[i].reading_time);
    }
    // this.timeW.shift();

    for (let i=0; i<this.KVAH_DW.length; i++){
      this.KVAH_DataW.push(this.KVAH_DW[i] - this.KVAH_DW[i+1]);
    }

    this.KVAH_DataW = this.KVAH_DataW.map(function(each_element: number){
      return Number(each_element.toFixed(1));
  });
    this.KVAH_DataW.pop();
    // this.KVAH_DataW.pop();

    this.timeW.pop();
    // this.timeW.pop();

    // console.log("bar5",this.KVAH_DataW);
    // console.log("bar5",this.timeW);
  }

  createSvg(): void {
    this.svg = d3.select("body#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

drawBars(): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(this.timeW.map((d: any) => d))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end")
  .style("font-size", "12px");
  
  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, Math.max.apply(null, this.KVAH_DataW)+1000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y))
  .selectAll("text")
      .style("font-size", "12px");

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(this.KVAH_DataW)
  .enter()
  .append("rect")
  // .attr("x", (d: string) => x(d))
  .attr("y", (d: d3.NumberValue) => y(d))
  .attr("width", x.bandwidth())
  .attr("height", (d: d3.NumberValue) => this.height - y(d))
  .attr("fill", "limegreen")
  .data(this.timeW)
  .attr("x", (d: string) => x(d));





  // this.svg.selectAll("text")
  //      .data(this.KVAH_DataW)
  //      .enter()
  //      .append("text")
  //      .attr("x", (d:any, i:number) => i * 20)
  //      .attr("y", (d: d3.NumberValue) => y(d))
  //      .text((d:any, i:number)=> d );

       this.svg.append("g")
       .selectAll("text")
       .data(this.KVAH_DataW)
       .enter()
       .append("text")
       .attr("y", (d: d3.NumberValue) => y(d) - 3)
       .text((d:any, i:number)=> d ).data(this.timeW)
       .attr("x", (d: string) => x(d))
       .style("font-size", "12px");

      


}

  

}
