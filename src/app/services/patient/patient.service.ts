import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { Patient } from '../../model/patient/patient';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConstantApi } from '../../model/constant/constant-api';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  addNewPatient(patient: Patient): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.ADD_NEW_PATIENT, patient);
  }

  updatePatient(patient: Patient): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.UPDATE_PATIENT, patient);
  }

  getAllPatientByHosId(hospitalId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.GET_ALL_PATIENTS_BY_HOSPITAL_ID + '?id=' + hospitalId)
  }

  getPatientByPatientId(patientId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.GET_PATIENT_BY_PATIENT_ID + '?patientId=' + patientId)
  }

  delterPatientByPatientId(patientId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.DELETE_PATIENT_BY_PATIENID + '?patientId=' + patientId)
  }

  getAllPatient(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.GET_ALL_PATIENTS);
  }

}
