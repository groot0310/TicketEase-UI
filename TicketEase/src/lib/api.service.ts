import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8088/ohsms';
  constructor(private http: HttpClient) {}

  login(user: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/authenticate/login`, user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/authenticate/logout`);
  }

  createAdmin(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/admin/create-admin`, data, {
      observe: 'response',
      withCredentials: true,
    });
  }

  createEngineer(data: any): Observable<HttpResponse<any>> {
    const queryParams = new HttpParams({ fromObject: data });
    return this.http.post(
      `${this.baseUrl}/admin/create-engineer`,
      {},
      {
        params: queryParams,
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  createEmployee(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/admin/create-employee`, data, {
      observe: 'response',
      withCredentials: true,
    });
  }

  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/employees`, {
      withCredentials: true,
    });
  }
}
