import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHospitalComponent } from './new-hospital.component';

describe('NewHospitalComponent', () => {
  let component: NewHospitalComponent;
  let fixture: ComponentFixture<NewHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHospitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
