import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import * as common from './baseurl'
import { Observable } from 'rxjs';
import { Sensor } from './sensorData';
import { Parameter } from './parameter';
import { sortcard } from './sorting';
@Injectable({
  providedIn: 'root'
})
export class CardService {
  x: any;
  apiUrl = "http://localhost:3000/api"
  // apiUrl = "http://backend-alb-1643516075.ap-south-1.elb.amazonaws.com/api"

constructor(private httpClient: HttpClient) { }

getMeters(){
  // return this.httpClient.get<Parameter[]>(common.endpoint +'/get_para.php').pipe(
  return this.httpClient.get<Parameter[]>(`${this.apiUrl}/getPara`).pipe(
    map( Parameter => {
      const newpara = [];
      for(let para of Parameter){
        const data_type = para.data_type;
        newpara.push({data_type: data_type});
      }
      return newpara;
    }),
    tap(Parameter => console.log(Parameter))
  );
}


 get_meterCardData(value:string) {
let sname="meter_CardData";
  return fetch(`${this.apiUrl}/meter_CardData/`+value)
  // return this.httpClient.get<Sensor[]>(common.endpoint + '/Meter_Carddata.php?value=' + value);
  // return fetch(common.endpoint+'/Meter_Carddata.php?value='+value)
}
// get_meterCardData2(value:string) {
//   // return this.httpClient.get<Emp[]>(common.baseURL + '/card.php');
//   return this.httpClient.get<sortcard[]>(common.endpoint+'/sortday2.php?m_id='+value);
// }
get_meterAccordianData(value:string) {
  // return this.httpClient.get<Emp[]>(common.baseURL + '/card.php');
  return this.httpClient.get<Sensor[]>(common.endpoint+'/Meter_Carddata.php?value='+value);
}
get_dayData1(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortday.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortday.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortDay/`+m_id)
}
get_dayData2(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortday2.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortday2.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortDay2/`+m_id)
}
get_dayData3(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortday311.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortday311.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortDay3/`+m_id)
}
get_dayData4(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortday4.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortday4.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortDay4/`+m_id)
}
get_week1(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortweek.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortweek.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortWeek/`+m_id)

}
get_week2(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortweek2.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortweek2.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortWeek2/`+m_id)
}
get_week3(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortweek3.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortweek3.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortWeek3/`+m_id)
}
get_week4(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortweek4.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortweek4.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortWeek4/`+m_id)
}
get_month(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortmonth.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortmonth.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortMonth/`+m_id)
}

// get_post(m_id: string) {
//   return this.httpClient.post<sortcard[]>(common.endpoint+'/sortmonth.php?m_id',m_id);
// }

get_month2(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortmonth2.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortmonth2.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortMonth2/`+m_id)
}
get_month3(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortmonth3.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortmonth3.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortMonth3/`+m_id)
}

get_month4(m_id: string) {
  // return this.httpClient.get<sortcard[]>(common.endpoint+'/sortmonth4.php?m_id='+m_id);
  // return fetch(common.endpoint+'/sortmonth4.php?m_id='+m_id)
  return fetch(`${this.apiUrl}/sortMonth4/`+m_id)
}

add_parameter(parameterdata:Parameter):Promise<any>{

  // console.log(parameterdata, "<---  signup data")
  // return this.httpClient.post(`${this.apiUrl}/addParameter`, parameterdata)

  return fetch(`${this.apiUrl}/addParameter`, {
    method:"POST",
    body: JSON.stringify({
      data_type: parameterdata.data_type,
            Max1: parameterdata.Max1,
            Min1: parameterdata.Min1,
            unit: parameterdata.unit,
            M_id: parameterdata.M_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
  });

}

add_card(value:string){
  // return this.httpClient.get<Parameter[]>( common.endpoint+"/addCard.php?value="+value);
  return this.httpClient.get<Parameter[]>(`${this.apiUrl}/addCard/`+value);

}
update_parameter(data_type:Parameter): Observable<Parameter>{
  return this.httpClient.post<Parameter>( common.endpoint+"/updateParameterData.php",data_type);
}
deleteCard(id: number){
  return this.httpClient.delete<Parameter>(`${this.apiUrl}/deleteCard/${id}`);
  // return this.httpClient.delete<Parameter>(`https://senselive.in/API_local/delete_card.php/?id=${id}`);
}  

get_para(data_type:string){
  // return this.httpClient.get<Parameter[]>( common.endpoint+"/Unique_para.php?data_type="+data_type);
  return this.httpClient.get<Parameter[]>(`${this.apiUrl}/uniquePara/`+data_type);
  // return fetch(`${this.apiUrl}/sortMonth/`+data_type)

}

}
