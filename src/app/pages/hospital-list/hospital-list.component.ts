import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { Hospital } from '../../model/hospital/hospital';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospital-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hospital-list.component.html',
  styleUrl: './hospital-list.component.scss'
})
export class HospitalListComponent implements OnInit {
  hospitalList: Hospital[] = [];

  constructor(
    private toastr: ToastrService,
    private hospital_service: HospitalService
  ) { }

  ngOnInit(): void {
    this.loadAllHospital();
  }

  loadAllHospital() {
    this.hospital_service.getAllHospital().subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.hospitalList = response.data;
        }
        else {
          this.toastr.error(response.message);
        }
      },
      error: (error: any) => {
        this.toastr.error(error.message);
      },
    });
  }
}
