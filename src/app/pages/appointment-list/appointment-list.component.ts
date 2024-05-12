import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { Appointment } from '../../model/appointment/appointment';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
  loggedInHospitalId: number = 0;
  appointmentList: Appointment[] = [];
  appointment: Appointment = {
    name: "",
    mobileNo: "",
    city: "",
    age: 0,
    gender: "",
    appointmentDate: "",
    appointmentTime: "",
    isFirstVisit: false,
    naration: "",
    hospitalId: 0
  }
  loggedInObj: any;


  constructor(
    private appointment_service: AppointmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const loginData = localStorage.getItem("hospitalLogin");
    if (loginData) {
      this.loggedInHospitalId = JSON.parse(loginData).hospitalId;
      this.loggedInObj = JSON.parse(loginData)

    }

    if (this.loggedInObj.userName != 'superadmin') {
      this.loadAllAppointmentByHospital();

    } else {
      this.loadAllAppointment();
    }
  }

  loadAllAppointmentByHospital() {
    this.appointment_service.getAppointmentByHosId(this.loggedInHospitalId).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.appointmentList = response.data;
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

  loadAllAppointment() {
    this.appointment_service.getAllAppointment().subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.appointmentList = response.data;
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

  openAppointmentForm() {
    const model = document.getElementById("appointmentForm");
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeAppointmentForm() {
    const model = document.getElementById("appointmentForm");
    if (model != null) {
      model.style.display = "none";
      this.clearForm();
    }
  }

  onAppointmentBooking() {
    this.appointment.hospitalId = this.loggedInHospitalId;
    this.appointment_service.addNewAppointmentByHosId(this.appointment).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.loadAllAppointmentByHospital();
          this.toastr.success(response.message);
          this.closeAppointmentForm();
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
    this.appointment = {
      name: "",
      mobileNo: "",
      city: "",
      age: 0,
      gender: "",
      appointmentDate: "",
      appointmentTime: "",
      isFirstVisit: false,
      naration: "",
      hospitalId: 0
    }

  }

}
