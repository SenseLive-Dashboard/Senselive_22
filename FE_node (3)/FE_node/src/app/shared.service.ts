import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject=new Subject<any>();
  private subject2=new Subject<any>();

  sendfunc(meterid:string)
  {
this.subject.next(meterid);

  }

  sendfunc2(meterid:string)
  {
this.subject2.next(meterid);

  }
  getEvent():Observable<any>{
    return this.subject.asObservable();
  }
  getEvent2():Observable<any>{
    return this.subject2.asObservable();
  }

  onAccordianClick(meterid: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  invoketableFunction = new EventEmitter(); 
  invokeaccordianFunction = new EventEmitter(); 
  invokegridFunction = new EventEmitter(); 
  invokeupdateFunction = new EventEmitter(); 
  sendCompanyName:any;
  sendLoginArray:any;
  subsVar!: Subscription;
  subsVar1!: Subscription;
  subsVar2!: Subscription;
  subsVar3!: Subscription;
  subsVar4!: Subscription;
  subsVar5!: Subscription;
  subsVar99!: Subscription;
  subsVar991!: Subscription;

  onOverviewClick(meterid:string) {   
    console.log("overview run",meterid); 
    this.invoketableFunction.emit(meterid);  
    console.log("accordian run",meterid);   
    this.invokeaccordianFunction.emit(meterid);
   
  } 
  // onAccordianClick(meterid:string) { 
  //   console.log("accordian run",meterid);   
  //   this.invokeaccordianFunction.emit(meterid);   
  // } 
  onLoginArray(data:[]){
    this.sendLoginArray = data;
    return this.sendLoginArray;
  }
  onClickupdate(){
    this.invokegridFunction.emit(); 
  }
  onClickregister(){
    this.invokeupdateFunction.emit(); 
  }

}
