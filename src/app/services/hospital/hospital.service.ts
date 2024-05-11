import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hospital } from '../../model/hospital/hospital';
import { ConstantApi } from '../../model/constant/constant-api';
import { ApiResponse } from '../../model/apiresponse/api-response';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  registerHospital(hospital: Hospital): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.ADD_NEW_HOSPITAL, hospital);
  }
}
