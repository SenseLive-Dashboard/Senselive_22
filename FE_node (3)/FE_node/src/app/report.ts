export interface Report {
    id: number,
    Device_id:any,
   initial_reading: string,
   final_reading: string,
   initial_kvah: number,
   final_kvah: number,
   total_time: number,
   total_kvah: number,
    
}


export class reportData{
    // invoiceNo:any;
    // invoiceDate: any;
    // paymentMethod: any;
    // mileStone: any;
    // signedBy:any;
    Device_id:any;
    final_reading: any;
    initial_reading: any;
    total_time: any;
    final_kvah: any;
    initial_kvah: any;
    total_kvah: any;
    
}
