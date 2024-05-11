import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hospital } from '../../model/hospital/hospital';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {

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

  ngOnInit(): void {
    const loginData = localStorage.getItem("hospitalLogin");
    if (loginData) {
      this.loggedHospitalObj = JSON.parse(loginData);
    }
  }

}
