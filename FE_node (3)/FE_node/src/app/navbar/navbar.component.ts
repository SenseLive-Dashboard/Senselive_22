import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { DialogboxService } from '../dialogbox.service';
import { Meter } from '../meterreg';
import { MeterregService } from '../meterreg.service';
import { SharedService } from '../shared.service';
import { Sensor } from '../sensorData';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval, timer } from 'rxjs';
import { CardService } from '../card.service';
import { map, share } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data1: Sensor[] = [];
  data: any;
  [x: string]: any;
  mySub1!: Subscription;
  variable: boolean = true;
  logoutbtn: boolean;
  meter: Meter[] = [];
  value: any;
  url2: any;
  showModal: boolean | any;
  meterDetailsform: FormGroup | any;
  submitted = false;
  id: any;
  name: any;
  metid: any;
  comp: any;
  locate: any;
  meterdetails: Meter[] = [];
  url: any = '';
  profile_data:any;

  constructor( private dialogboxService: DialogboxService,private apiService: ApiService,private cardservice:CardService, private shared: SharedService, private formBuilder: FormBuilder, private meterreg: MeterregService) {
    apiService.getLoggedInName.subscribe((name: any) => this.changeName(name));
    if (this.apiService.isLoggedIn()) {
      console.log("loggedin");
      this.logoutbtn = true
    }
    else {
      this.logoutbtn = false
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
  }

  logout() {
    this.apiService.deleteToken();
    window.location.href = "http://localhost:4200/login";
    window.sessionStorage.clear();
  }

  // onNavigate(){
  //   window.open("http://senselive.in/","_blank");
  // }

  ngOnInit(): void {
     // Using RxJS Timer
     this.subscription = timer(0, 1000)
     .pipe(
       map(() => new Date()),
       share()
     )
     .subscribe(time => {
       this.rxTime = time;
     });


    this.value = JSON.parse(window.sessionStorage.getItem('userdata') || '{}');
    this.meterDetailsform = this.formBuilder.group({
      id: [''],
      meterName: ['',Validators.required],
      meterid: [''],
      company: [''],
      location: ['',Validators.required]
    });
    
    this.meterreg.addMeter(this.value).subscribe((response) => {
      this.meter = response;
      console.log(this.meter);
      
      return this.meter;
    });

    this.meterreg.get_profile(this.value).subscribe((response) => {
      this.profile_data = response;
      
      // console.log(this.value[0]);

      for(let i=0;i<this.profile_data.length;i++){
      if(this.value==this.profile_data[i].company){
        this.check_profile_image(this.profile_data[i].profile_url);
      }
    }
      return this.profile_data;
    });

    this.clickEventSubscription= this.shared.getEvent().subscribe((meterid: any)=>{
      this.x=meterid;
      this.readingtime(this.x);
// this.linechart2(this.x);
    })

    if (this.shared.subsVar4 == undefined) {
      this.shared.subsVar4 = this.shared.invokeupdateFunction.subscribe(() => {
        this.changename();
      });
  
    }

  }

 async readingtime(meterid:string){
  this.m_id=meterid;
    // console.log("nav date",this.meter[0].meterid);
//     this.cardservice.get_meterCardData(this.meter[0].meterid).subscribe((response) => {
//       // this.data1=[];
//       this.data1=response;
// // console.log("grid data",this.data1);
// return this.data1;      
// });

// to use promise in service gor this function we have to include then() so that it can recieve that promise in this function
let response =await this.cardservice.get_meterCardData(this.m_id);
    let data_res=await response.json();
    this.data1=data_res;
    
   
  }

  changename(){
    console.log("calledbygrid1");
    this.ngOnInit();
  }

  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  ngOnDestroy():void{
  this.mySub1.unsubscribe();
    
  }
  
  hide() {
    this.ngOnInit();
    this.variable = false;
    this.meterDetailsform.reset();
    this.variable = true;
    this.showModal = false;
    // this.registerForm.reset();
  }
  
  onSubmit() {
    this.meterDetailsform.controls['id'].setValue(this.id);
    this.meterDetailsform.controls['meterid'].setValue(this.metid[0]);
    this.meterDetailsform.controls['company'].setValue(this.comp[0]);
    this.submitted = true;

    if(this.meterDetailsform.controls['meterName'].value=="" && this.meterDetailsform.controls['location'].value==""){
      console.log("first condition");
        this.meterDetailsform.controls['meterName'].setValue(this.name[0]);
        this.meterDetailsform.controls['location'].setValue(this.locate[0]);
     }
     else if(this.meterDetailsform.controls['meterName'].value=="" && this.meterDetailsform.controls['location'].value!=""){
       console.log("second condition");
      this.meterDetailsform.controls['meterName'].setValue(this.name[0]);
     }
     else if(this.meterDetailsform.controls['meterName'].value!="" && this.meterDetailsform.controls['location'].value==""){
      console.log("third condition");
      this.meterDetailsform.controls['location'].setValue(this.locate[0]);
     }

    // stop here if form is invalid
    if (this.submitted) {

      console.log(this.meterDetailsform.value);
      this.meterreg.meterUpdate(this.meterDetailsform.value).subscribe((meterupdateDetails: Meter) => {
        console.log("Meter updatein meterregister", meterupdateDetails);
        alert("Meter Details Update Successful");
        this.ngOnInit();
        this.shared.onClickupdate();
      });
      this.meterreg.meterUpdate1(this.meterDetailsform.value).subscribe((meterupdateDetails: Meter) => {
        console.log("Meter updatein sensordata", meterupdateDetails);
      });

      
      this.variable = false;
      this.meterDetailsform.reset();
      this.variable = true;
      this.showModal = false;
      this.submitted = false;

    }
  }

  getmeterId(event: any) {

    this.id = event.target.value;
    console.log(this.id);

    this.meterreg.get_meterData(this.id).subscribe((response) => {
      this.meterdetails = response;
      console.log(this.meterdetails);
      this.name = this.meterdetails.map((t: { meterName: any; }) => t.meterName);
      this.metid = this.meterdetails.map((t: { meterid: any; }) => t.meterid);
      this.comp = this.meterdetails.map((t: { company: any; }) => t.company);
      this.locate = this.meterdetails.map((t: { location: any; }) => t.location);
    });

  }

  deleteMeter() {
    this.dialogboxService.confirmThis("Are you sure to delete?", () => {
      this.meterreg.deleteMeter(this.id).subscribe((meterDetails: Meter) => {
        console.log("Meter Deleted ", meterDetails);
        this.ngOnInit();
        this.shared.onClickupdate();
        this.showModal = false;
      });
    }, function () {
      console.log("Cancel Meter Deletion")
    })
  }

  onSelectFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed 
        localStorage.setItem('profileImg', JSON.stringify(event.target?.result));
        // console.log("Image", event.target?.result);
        // this.url = JSON.parse(window.sessionStorage.getItem('profileImg') || '{}');
        // this.url = JSON.parse(localStorage.getItem('profileImg') || '{}');
        this.url2 = event.target?.result;
        // console.log(this.url2);

        this.data = 
          {
          company: this.value,
          profile_url: this.url2
        }
      
       
        this.meterreg.profile(this.data).subscribe((response) => {
          // console.log("add");
          
        });
      

      
        this.meterreg.profile_update(this.data).subscribe((response) => {  // update profile pic service calling
          // console.log("update");
          this.ngOnInit();
        });

      


      }

    }
  }

  deleteprofile() {
    // this.url = null;
    this.meterreg.profile_delete(this.profile_data).subscribe((response) => {  // delete profile pic service calling
        this.url = null;
    });
  }

  check_profile_image(name:string) {
    this.url = name 
  }
  Name:any;
Designation:any;
Email:any;
MobileNo:any;
Address:any;
// ColdStorage:any;
// Energy:any;

profileDetails(){
    
  this.Name=JSON.parse(window.sessionStorage.getItem('Name')||'{}');
  this.Designation=JSON.parse(window.sessionStorage.getItem('Designation')||'{}');
  this.Email=JSON.parse(window.sessionStorage.getItem('Email')||'{}');
  this.MobileNo=JSON.parse(window.sessionStorage.getItem('MobileNo')||'{}');
  this.Address=JSON.parse(window.sessionStorage.getItem('Address')||'{}');
  // this.ColdStorage=JSON.parse(window.sessionStorage.getItem('ColdStorage')||'{}');
  // this.Energy=JSON.parse(window.sessionStorage.getItem('Energy')||'{}');

  
}
}

