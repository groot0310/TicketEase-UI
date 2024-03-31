import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8088/ohsms';
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  login(user: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/authenticate/login`, user, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/authenticate/logout`);
  }

  createAdmin(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/admin/create-admin`, data, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
}
