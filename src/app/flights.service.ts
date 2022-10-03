import { Injectable } from '@angular/core';
import { Flight } from './flight.model';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) {
    this.backEndURL=this.getBackEndURL();
   }

   backEndURL:string;

   getBackEndURL(): string {
    const segements = document.URL.split('/');
    const reggie = new RegExp(/localhost/);
    return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://test.herokuapp.com';
  }

  getAllOrigins(): Observable<any>{
    return this.http.get(`${this.backEndURL}/flights/cities/origins`);
  }

  getAllDestinations(): Observable<any>{
    return this.http.get(`${this.backEndURL}/flights/cities/destinations`);
  }

  getAllFlights(): Observable<any>{
    return this.http.get(`${this.backEndURL}/flights`);
  }

  getFlights(orig:string, dest:string):Observable<any>{
    return this.http.get(`http://localhost:3000/flights/query/${orig}/${dest}`);
  }

  postFlight(flight:Flight){
    return this.http.post(
    `http://localhost:3000/flights`,flight
    ).subscribe(
      data=>{
        console.log("data posted to server!")
      }
    );
  }

  updateFlight(flight:Flight){
    return this.http.patch(
      `${this.backEndURL}/flights/${flight.id}`,
      flight
    );
  }

  deleteFlight(id:number){
    return this.http.delete(
      `${this.backEndURL}/flights/${id}`
      
    );
  }
  
}
