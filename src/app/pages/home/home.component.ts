import { Component, OnInit } from '@angular/core';
import { NewHospitalComponent } from "../new-hospital/new-hospital.component";
import { Hospital } from '../../model/hospital/hospital';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NewHospitalComponent]
})
export class HomeComponent implements OnInit {

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

    constructor(private router: Router) { }

    ngOnInit(): void {
        const loginData = localStorage.getItem("hospitalLogin");
        if (loginData) {
            this.loggedHospitalObj = JSON.parse(loginData);
            this.router.navigate(["dashboard"]);
        }
    }

}
