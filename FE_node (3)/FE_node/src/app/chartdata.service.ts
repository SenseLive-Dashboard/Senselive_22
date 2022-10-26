import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as common from './baseurl'
import { sortcard } from './sorting';

@Injectable({
  providedIn: 'root'
})
export class ChartdataService {
  // apiUrl = "http://localhost:3000/api"
  // apiUrl = "http://backend-alb-1643516075.ap-south-1.elb.amazonaws.com/api"
  

  constructor(private http: HttpClient) { }

  // getData(){
  //   let url = "https://senselive.in/graph_swatej/chartdata.php";
  //   return this.http.get(url);
  // }
  getDataDay(){
    // let url = "https://senselive.in/graph_swatej/chartdata.php";
    let url = "https://senselive.in/graph_swatej/sortday.php";
    // let url = "https://senselive.in/graph_swatej/sortday.php";
    return this.http.get(url);
  }

  getData(m_id: string){
    // console.log("bar month",m_id)
    // return this.http.get<sortcard[]>(common.endpoint+'/daychart.php?m_id='+m_id);
    return this.http.get<sortcard[]>(`${common.apiUrl}/daychart/`+m_id);
    // let url = "https://senselive.in/graph_1/sortweek.php";
    // return this.http.get(url);
  }

  getDataWeekbar(m_id: string){
    // let url = "https://senselive.in/graph_1/sortweek.php";
    // return this.http.get(url);
    // console.log("bar week",m_id)
    // return this.http.get<sortcard[]>(common.endpoint+'/bar.php?m_id='+m_id);
    return this.http.get<sortcard[]>(`${common.apiUrl}/bar/`+m_id);
  }

  

  getDataW(){
    let url = "https://senselive.in/graph_1/sortweek.php";  //8 days
    // let url = "https://senselive.in/graph_swatej/sortday.php";
    // return this.http.get<sortcard[]>(common.endpoint+'/linechart.php?m_id='+m_id);
    return this.http.get(url);
  }

  getDataM(m_id: string){
    // let url = "https://senselive.in/graph_1/sortweek.php";
    // let url = "https://senselive.in/graph_swatej/sortmonth.php";
    // return this.http.get(url);
      // return this.http.get<sortcard[]>(common.endpoint+'/line2chart.php?m_id='+m_id);
      return this.http.get<sortcard[]>(`${common.apiUrl}/line2chart/`+m_id);
    
  }

  getAllday(m_id: string){
      return this.http.get<sortcard[]>(`${common.apiUrl}/alldaydata/`+m_id);
    
  }

}
