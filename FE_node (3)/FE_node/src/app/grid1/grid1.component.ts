import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meter } from '../meterreg';
import { MeterregService } from '../meterreg.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DialogboxService } from '../dialogbox.service';
import { SharedService } from '../shared.service';
import { FormControl, Validators } from "@angular/forms";
import { Sensor } from '../sensorData';
import { UserService } from '../user.service';
import { UniqueMeternameValidator } from '../unique-metername-validator.directive';
import { style } from '@angular/animations';
import { reduce } from 'rxjs/operators';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from "../Shared/http.service";

@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.css']
})
export class Grid1Component implements OnInit {
  
  [x: string]: any;
  closeModal: string | undefined;
  meter: Meter[] = [];
  value: any;
  Cname: string[] = [];
  faTimes = faTimes;
  showModal: boolean | any;
  registerForm: FormGroup | any;
  submitted = false;
  delRecord: any;
  sensor: Sensor[] = [];
  data: Sensor[] = [];
  loading = false;
  buttionText = "Submit";
 
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  
  
  constructor(public http: HttpService,private formBuilder: FormBuilder, private meterreg: MeterregService, private shared: SharedService, private userService: UserService, private dialogboxService: DialogboxService, private modalService: NgbModal) { }
  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  // For meter id array
  new_meter_id_arr: string[] = [];
  time:any;
  ngOnInit() {
   
    var arr:any=JSON.parse(localStorage.getItem("new_time_array")|| '{}');
    // console.log("local arr nav",arr.length);
  
    // console.log(this.http.test);
    this.value = JSON.parse(window.sessionStorage.getItem('userdata') || '{}');

    this.Cname = this.shared.sendLoginArray;

    this.registerForm = this.formBuilder.group({
      id: [''],
      meterName: ['', Validators.required, UniqueMeternameValidator(this.meterreg)],
      meterid: ['', Validators.required],
      company: [''],
      location: ['', Validators.required]
    });


   

    this.meterreg.addMeter(this.value).subscribe((response) => {
      this.meter = response;
      console.log("Meter Name:", this.meter)
      console.log("Meter id:", this.meter[0].meterid)

      // this.meter.forEach(element =>console.log("each",element.meterid));
      // this.meter.forEach(element =>this.new_meter_id_arr.push(element.meterid));


      // meter =[id1, id2, id3]
      for(this.i=0; this.i<this.meter.length; this.i++){
        if(this.new_meter_id_arr[this.i]== this.meter[this.i].meterid){
          continue;

        }else{
          this.new_meter_id_arr.push(this.meter[this.i].meterid)
        }
      }

      // console.log("new_arry_of_meter_id", this.new_meter_id_arr);

      localStorage.setItem("new_meter_id_array", JSON.stringify(this.new_meter_id_arr))
      return this.meter;
    });

    

    if (this.shared.subsVar2 == undefined) {
      this.shared.subsVar2 = this.shared.invokegridFunction.subscribe(() => {
        this.addname();
      });
    }

  }
 

  ngOnDestroy(): void {
  
    // this.shared.subsVar1.unsubscribe(); 
    
  }

  addname(){
    console.log("calledbynavbar");
    this.ngOnInit();
  }
  
  show() {
    this.showModal = true; // Show-Hide Modal Check   
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
    this.registerForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.registerForm.controls['company'].setValue(this.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.meterreg.meterRegistration(this.registerForm.value).subscribe((meterDetails: Meter) => {
        console.log("Meter Registered", meterDetails);
        this.showModal = false;
        alert("Meter Registered");
        this.ngOnInit();
        this.shared.onClickregister();
      },
        (error) => {
          this.showModal = false;
          alert("Meter Already Registered");
        });

      
      this.registerForm.reset();
      this.submitted = false;
    }
  }

  // deleteMeter(id: number) {
  //   this.dialogboxService.confirmThis("Are you sure to delete?", () => {
  //     this.meterreg.deleteMeter(id).subscribe((meterDetails: Meter) => {
  //       console.log("Meter Deleted ", meterDetails);
  //       this.ngOnInit();
  //     });
  //   }, function () {
  //     console.log("Cancel Meter Deletion")
  //   })
  // }
 
  
  displaydataMeter(meterid: string) {
    
    // this.userService.insertdata(meterid).subscribe((response)=>{
    //   this.data=response;
    //   return this.data;
    // }); 
  

    this.shared.onOverviewClick(meterid);
localStorage.setItem("meterid", meterid);
// localStorage.setItem("meterid2", this.meter[0].meterid);
localStorage.setItem("meterid3", meterid);
this.shared.sendfunc(meterid);
  
    // this.shared.onAccordianClick(meterid);
  }


}


