import { Component, OnInit } from '@angular/core';
import {Flight} from '../flight.model';
import {FlightsService} from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor( private flightService: FlightsService) { }
  
  loading: boolean = true;
  origin:string ="";
  destination:string="";
  flightNumber:number=0;
  depart:Date=new Date("00/00/00");
  arrive:Date=new Date("00/00/00");
  nonstop:boolean=false;
  flightList: any[]=[];


  refresh(){
    this.flightService.getAllFlights().subscribe(
      data=>{
        this.flightList=data;
        this.loading=false;
      }
    )
  }

  ngOnInit(): void {
    this.refresh();
  }

  toggleNonStop(){
    this.nonstop=!this.nonstop;
  }

  sendFlight(){
    const flight: Flight={
      origin: this.origin,
      destination:this.destination,
      flightNumber:this.flightNumber,
      depart:this.depart,
      arrive:this.arrive,
      nonstop:this.nonstop
    }
    this.flightService.postFlight(flight);
  }


  update(flight:Flight){
    
    this.flightService.updateFlight(flight).subscribe((data:any)=>{
      console.log(data);
      var changed=0;
      if ('affected' in data){
        changed=data.affected;
      }
      if(data && changed>0){
        console.log('refresh...');
        this.refresh();
      }
    });
  }

  delete(flight:Flight){

    if (window.confirm(
      'Are you sure you want to delete this flight?'
    )){

      var id : any =0;
      if (!isNaN(flight.id as any)){
          id=flight.id;
          this.flightService.deleteFlight(id).subscribe(
          (data:any)=>{
            var changed=0;
            if ('affected' in data){
              changed=data.affected;
            }
            if(data && changed>0){
              console.log('refresh...');
              this.refresh();
            }
          }
        )
      }else{
        console.log("wrong input");
      }

    } 
  }
  

  
}
