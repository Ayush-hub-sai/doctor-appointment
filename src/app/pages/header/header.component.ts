import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../model/hospital/hospital';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Login } from '../../model/login/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public user: Login = {
    userName: '',
    password: ''
  }

  loggedHospitalObj: Hospital = {
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
  };
  loginData = localStorage.getItem("hospitalLogin");

  constructor(private login_service: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private hospital_service: HospitalService) {
  }

  ngOnInit(): void {
    this.login_service.hospitalObservable$.subscribe((response: Hospital) => {
      this.loggedHospitalObj = response;
    })
    this.convertLocalDataToParse();
  }

  convertLocalDataToParse() {
    if (this.loginData) {
      this.loggedHospitalObj = JSON.parse(this.loginData);
    }
  }

  showLogin() {
    const model = document.getElementById("loginModal");
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeLogin() {
    const model = document.getElementById("loginModal");
    if (model != null) {
      model.style.display = "none";
      this.clearForm();
    }
  }

  onLogin() {
    this.login_service.login(this.user).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.loggedHospitalObj = response.data;
          this.login_service.storeLoginData(response.data)
          localStorage.setItem("hospitalLogin", JSON.stringify(response.data));
          this.toastr.success(response.message);
          this.clearForm();
          this.closeLogin();
          this.router.navigate(["dashboard"]);
        }
        else {
          this.toastr.error(response.message);
        }
      },
      error: (error: any) => {
        this.toastr.error(error.message);
        this.clearForm();
      },
    });
  }

  clearForm() {
    this.user = {
      userName: '',
      password: ''
    }
  }

  clearHospitalForm() {
    return this.loggedHospitalObj = {
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
    };
  }

  onLogout() {
    localStorage.removeItem("hospitalLogin");
    this.clearHospitalForm();
    this.closeLogin();
    this.router.navigate(["home"]);
    this.login_service.storeLoginData(this.clearHospitalForm())
  }

  OpenUpdateHopitalForm() {
    const model = document.getElementById("updateHospitalForm");
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeUpdateHopitalForm() {
    const model = document.getElementById("updateHospitalForm");
    if (model != null) {
      model.style.display = "none";
    }
    this.clearHospitalForm();
    this.convertLocalDataToParse()
  }


  updateHospital() {
    //api is not working for update
    this.hospital_service.updateHospital(this.loggedHospitalObj).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.toastr.success(response.message);
          this.loggedHospitalObj = response.data;
          this.closeUpdateHopitalForm();
          this.convertLocalDataToParse()

        }
        else {
          this.toastr.error(response.message);
        }
      },
      error: (error: any) => {
        this.toastr.error(error.message);
        this.clearHospitalForm();
      },
    });
  }
}
