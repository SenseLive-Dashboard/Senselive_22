import { Component, OnInit } from '@angular/core';
import { DialogboxService } from '../dialogbox.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  message: any;  
  constructor(private dialogboxService: DialogboxService) { }  

  ngOnInit(): any {  
     /** 
      *   This function waits for a message from alert service, it gets 
      *   triggered when we call this from any other component 
      */  
      this.dialogboxService.getMessage().subscribe(message => {  
          this.message = message;  
      });  
  }  

  


}
