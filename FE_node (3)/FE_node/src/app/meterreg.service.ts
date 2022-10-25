import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Meter } from './meterreg';
import * as common from './baseurl';

@Injectable({
  providedIn: 'root'
})
export class MeterregService {
  apiUrl = "http://localhost:3000/api"
  // apiUrl = "http://backend-alb-1643516075.ap-south-1.elb.amazonaws.com/api"

  constructor(private httpClient: HttpClient) {}
  getMeters4(){
    // return this.httpClient.get<Meter[]>(common.endpoint +'/Get_meter.php').pipe(
    return this.httpClient.get<Meter[]>(`${this.apiUrl}/getMeter`).pipe(
      map( Meter => {
        const newMeter = [];
        for(let meter of Meter){
          const meterName = meter.meterName;
          newMeter.push({meterName: meterName});
        }
        return newMeter;
      }),
      tap(Meter => console.log(Meter))
    );
  }

  

  getMeterByMetername(meterName:string){
    // return this.httpClient.get<Meter[]>(common.endpoint +'/Unique_MeterName.php?meterName='+meterName);
    return this.httpClient.get<Meter[]>(`${this.apiUrl}/uniqueMeterName/`+meterName);

  }
  meterRegistration(meterDetails: Meter): Observable<Meter> {
    return this.httpClient.post<Meter>(`${this.apiUrl}/registration_meter`, meterDetails);
  }
  addMeter(value:string) {
    // return this.httpClient.get<Meter[]>(common.endpoint +'/Display_meter.php?value='+value);
    return this.httpClient.get<Meter[]>(`${this.apiUrl}/displayMeter/`+value);
  }
  deleteMeter(id: number){
    return this.httpClient.delete<Meter>(`${this.apiUrl}/deleteMeter/`+id);
  }

  get_meterData(id:number) {
    return this.httpClient.get<Meter[]>(`${this.apiUrl}/displayMeterDetails/`+id);
  }
  meterUpdate(meterupdateDetails:Meter): Observable<Meter>{
    // return this.httpClient.post<Meter>(common.endpoint +'/Meter_DetailsUpdate.php', meterupdateDetails);
    return this.httpClient.post<Meter>(`${this.apiUrl}/Meter_DetailsUpdate`, meterupdateDetails);
  }
  meterUpdate1(meterupdateDetails:Meter): Observable<Meter>{
    // return this.httpClient.post<Meter>(common.endpoint +'/Meter_DetailsUpdate1.php', meterupdateDetails);
    return this.httpClient.post<Meter>(`${this.apiUrl}/Meter_DetailsUpdate1`, meterupdateDetails);
  }
  
  profile(profileDetails: string): Observable<any> {
    // console.log("pservice",profileDetails)
    return this.httpClient.post(`${this.apiUrl}/profile`, profileDetails);
  }

  get_profile(value: string): Observable<any> {
    // console.log("pservice",profileDetails)
    return this.httpClient.get(`${this.apiUrl}/get_profile/`+value);
  }


  profile_update(profileDetails:string): Observable<Meter>{
    return this.httpClient.post<Meter>(`${this.apiUrl}/profile_update`, profileDetails);
  }

  profile_delete(profileDetails:any): Observable<any>{
    var company=profileDetails[0].company
    return this.httpClient.delete<any>(`${this.apiUrl}/profile_delete/`+company);
  }


}
