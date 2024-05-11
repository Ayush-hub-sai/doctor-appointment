import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./pages/header/header.component";
import { SideNavComponent } from "./pages/side-nav/side-nav.component";
import { CommonModule } from '@angular/common';
import { Hospital } from './model/hospital/hospital';
import { LoginService } from './services/login/login.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, SideNavComponent, CommonModule]
})
export class AppComponent implements OnInit {


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

  constructor(private login_service: LoginService) { }

  ngOnInit(): void {
    this.login_service.hospitalObservable$.subscribe((response: Hospital) => {
      if (response) {
        this.loggedHospitalObj = response;
      }
    })

    const loginData = localStorage.getItem("hospitalLogin");
    if (loginData) {
      this.loggedHospitalObj = JSON.parse(loginData);
    }

  }

}
