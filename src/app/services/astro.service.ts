import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AstroService {

  constructor(private http: HttpClient) { }

  getHoroscop(sign: string): Observable<any> {
    return this.http.get(`http://horoscope-api.herokuapp.com/horoscope/today/${sign}`);
  }
}
