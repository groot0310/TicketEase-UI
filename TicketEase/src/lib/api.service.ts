import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8088/ohsms';
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate/login`, user);
  }
}
