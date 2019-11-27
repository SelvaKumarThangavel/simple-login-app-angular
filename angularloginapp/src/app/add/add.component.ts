import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddService } from '../_service/add/add.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addEmployeeForm: FormGroup;
  genders: any;
  selectedGender: String;
  genderName: any;
  employeeDetails: any;

  get name() {
    return this.addEmployeeForm.get('name');
  }

  get gender() {
    return this.addEmployeeForm.get('gender');
  }

  get dob() {
    return this.addEmployeeForm.get('dob');
  }

  constructor(private fb: FormBuilder, private addService: AddService) { }

  ngOnInit() {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required]
    })

    this.genders = [
      { name: 'Male', value: 1 },
      { name: 'Female', value: 2 }
    ];
  }

  onChangeGender(event) {
    // console.log(event.target.value)
    this.genderName = event.target.value
  }

  onSubmit() {
    var swal: any = Swal.mixin({
      toast: true,
      width: '400px',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
    this.addEmployeeForm.value.gender = this.genderName
    this.addEmployeeForm.value.dob = new Date(this.addEmployeeForm.value.dob)
    if (this.genderName === 'Select' || this.genderName === "" || this.genderName === undefined) {
      swal.fire({
        type: 'error',
        title: 'Please select valid Gender'
      })
    }

    this.addService.addEmployee(this.addEmployeeForm.value).pipe(first()).subscribe(data => { })
  }

}
