import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../services/patient/patient.service';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { Patient } from '../../model/patient/patient';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hospital } from '../../model/hospital/hospital';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {
  loggedInHospitalId: number = 0;
  patientList: Patient[] = [];
  patient: Patient = {
    patientId: 0,
    name: "",
    mobileNo: "",
    city: "",
    age: 0,
    gender: "",
    hospitalId: 0,
  }
  loggedInObj: any;

  constructor(
    private toastr: ToastrService,
    private patient_service: PatientService
  ) { }

  ngOnInit(): void {
    const loginData = localStorage.getItem("hospitalLogin");
    if (loginData) {
      this.loggedInHospitalId = JSON.parse(loginData).hospitalId;
      this.loggedInObj = JSON.parse(loginData)
    }
    if (this.loggedInObj.userName != 'superadmin') {
      this.loadPatientListByHospitalId();
    } else {
      this.loadAllPatient();
    }

  }

  loadPatientListByHospitalId() {
    this.patient_service.getAllPatientByHosId(this.loggedInHospitalId).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.patientList = response.data;
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

  loadAllPatient() {
    this.patient_service.getAllPatient().subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.patientList = response.data;
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

  openPatientForm() {
    const model = document.getElementById("patientForm");
    if (model != null) {
      model.style.display = "block";
    }
  }

  closePatientForm() {
    const model = document.getElementById("patientForm");
    if (model != null) {
      model.style.display = "none";
      this.clearForm();
    }
  }

  onPatientBooking() {
    this.patient.hospitalId = this.loggedInHospitalId;
    this.patient_service.addNewPatient(this.patient).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.loadPatientListByHospitalId();
          this.toastr.success(response.message);
          this.closePatientForm();
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

  editPatient(patient: Patient) {
    this.patient = JSON.parse(JSON.stringify(patient));
    this.openPatientForm();
  }

  deletePatien(patient: Patient) {
    this.patient_service.delterPatientByPatientId(patient.patientId).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.loadPatientListByHospitalId();
          this.toastr.success(response.message);
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

  updatePatient() {
    this.patient_service.updatePatient(this.patient).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.closePatientForm();
          this.loadPatientListByHospitalId();
          this.clearForm();
          this.toastr.success(response.message);
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

  clearForm() {
    this.patient = {
      patientId: 0,
      name: "",
      mobileNo: "",
      city: "",
      age: 0,
      gender: "",
      hospitalId: 0,
    }
  }

}
