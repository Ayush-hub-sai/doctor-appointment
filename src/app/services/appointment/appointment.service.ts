import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConstantApi } from '../../model/constant/constant-api';
import { Appointment } from '../../model/appointment/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  addNewAppointmentByHosId(appointment: Appointment): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.ADD_NEW_APPOINTMENT, appointment);
  }

  getAppointmentByHosId(hospitalId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.GET_ALL_APPOINTMENTS_BYHOSPITAL_ID + '?id=' + hospitalId)
  }

}
