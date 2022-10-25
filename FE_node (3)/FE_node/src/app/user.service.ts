import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as common from './baseurl'
import { Report, reportData } from './report';
import { Sensor } from './sensorData';
import { sortcard } from './sorting';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:3000/api"
  // apiUrl = "http://backend-alb-1643516075.ap-south-1.elb.amazonaws.com/api"

  constructor(private httpClient: HttpClient) { }
  
  sendidMeter(m_id: string){ // table service
      console.log(m_id);
      return fetch(`${this.apiUrl}/tableData/`+m_id)
      // return this.httpClient.get<Sensor[]>(common.endpoint+'/Tabledata-MeterId.php?m_id='+m_id);
    }

  sendidMeter2(m_id: string){ // report service
    console.log(m_id);
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Tabledata-MeterId.php?m_id='+m_id);
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/tableData/`+m_id);
    // return fetch(common.endpoint+'/Tabledata-MeterId.php?m_id='+m_id)
    
  }


  // insertdata(m_id: string){
  //   console.log(m_id);
  //   return this.httpClient.get<Sensor[]>(common.endpoint1+'/InsertData.php?m_id='+m_id);
  // }
displayReportData(value:string){
  // return this.httpClient.get<Report[]>(common.endpoint+'/getreport.php?value='+value);
  // return fetch(common.endpoint+'/getreport.php?value='+value)
  return fetch(`${this.apiUrl}/getReport/`+value)
}

  displayAllMeterData(companyName:string){
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Tabledata-Company.php?companyName='+companyName);
    return fetch(common.endpoint+'/Tabledata-Company.php?companyName='+companyName)
  }
  get_liveData(m_id: string) {
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Timestampsort_Live.php?m_id='+m_id);
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/timeStampSort_Live/`+m_id);
  }
  get_minuteData(m_id: string) {
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Timestampsort_Minute.php?m_id='+m_id);
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/timeStampSort_Minute/`+m_id);
  }
  get_hourData(m_id: string) {
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Timestampsort_Hour.php?m_id='+m_id);
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/timeStampSort_Hour/`+m_id);
  }
  get_dayData(m_id: string) {
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/timeStampSort_Day/`+m_id);
  }
  get_weekData(m_id: string) {
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Timestampsort_Week.php?m_id='+m_id);
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/timeStampSort_Week/`+m_id);

  }
  get_monthData(m_id: string) {
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Timestampsort_Month.php?m_id='+m_id);
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/timeStampSort_Month/`+m_id);

  }
  get_companyDrpdwn_data() {
    // return this.httpClient.get<Sensor[]>(common.endpoint+'/Filter_company.php');
    return this.httpClient.get<Sensor[]>(`${this.apiUrl}/filterCompany`);
    // return fetch(common.endpoint+'/Filter_company.php')
  }
  // add_report(initial_reading1:reportData): Observable<reportData> {
  // // console.log("service",initial_reading1);
  
  // // console.log("call",this.httpClient.post<Report>(common.endpoint+"/addReport.php", initial_reading1));
  //   return this.httpClient.post<reportData>(common.endpoint+"/addReport.php", initial_reading1);
    
  // }

  add_report2(initial_reading1:reportData) {
  
    
    // console.log("call",this.httpClient.post<Report>(common.endpoint+"/addReport.php", initial_reading1));
      // return this.httpClient.post<reportData>(`${this.apiUrl}/addReport`, initial_reading1);
      return fetch(`${this.apiUrl}/addReport`, {
        method:"POST",
        body: JSON.stringify(initial_reading1)
        // body: initial_reading1
      ,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    });
  }
}
