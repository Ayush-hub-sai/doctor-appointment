import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../model/hospital/hospital';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ApiResponse } from '../../model/apiresponse/api-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-hospital',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-hospital.component.html',
  styleUrl: './new-hospital.component.scss'
})
export class NewHospitalComponent implements OnInit {

  public hospital: Hospital = {
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
  }

  constructor(private hospital_service: HospitalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.hospital_service.registerHospital(this.hospital).subscribe({
      next: (response: ApiResponse) => {
        if (response.result) {
          this.toastr.success(response.message);
          this.clearForm();
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
    this.hospital = {
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
    }
  }

}
