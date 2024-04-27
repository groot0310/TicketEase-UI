import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  // ADMIN+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

  getEngineerList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/engineers`, {
      withCredentials: true,
    });
  }

  getAdminList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/admins`, {
      withCredentials: true,
    });
  }

  getComplaintsList(role: string, complaint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${role}/${complaint}`, {
      withCredentials: true,
    });
  }

  getUnassignedComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/complaints/unassigned`, {
      withCredentials: true,
    });
  }

  assignComplaint(compId: string, engId: string): Observable<any> {
    const url = `${this.baseUrl}/admin/complaints/assign-complaint`;
    const params = new HttpParams().set('compId', compId).set('engId', engId);
    return this.http.put(url, {}, { params, withCredentials: true });
  }

  deleteComplaint(compId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/admin/complaints/${compId}/delete`,
      { withCredentials: true }
    );
  }

  // EMPLOYEE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
