import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../model/login/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { environment } from '../../../environments/environment';
import { ConstantApi } from '../../model/constant/constant-api';
import { Hospital } from '../../model/hospital/hospital';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private hospitalSubject = new BehaviorSubject<Hospital>({
    hospitalId: 0,
    hospitalName: '',
    hospitalAddress: '',
    hospitalCity: '',
    hospitalContactNo: '',
    hospitalOwnerName: '',
    hospitalOwnerContactNo: '',
    hospitalEmailId: '',
    userName: '',
    password: ''
  });

  public hospitalObservable$: Observable<Hospital> = this.hospitalSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + ConstantApi.API_END_POINT.LOGIN, login);
  }

  storeLoginData(hospitalObj: Hospital) {
    this.hospitalSubject.next(hospitalObj);
  }

}
