import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../_service/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup

  get email() {
    return this.registrationForm.get('email');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(private fb: FormBuilder, 
    private authenticationService: AuthenticationService, 
    private router: Router ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    })
  }

  onRegister(){
    var swal: any = Swal.mixin({
      toast: true,
      width:'400px',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
      });
    this.authenticationService.newUserRegister(this.registrationForm.value).pipe(first())
    .subscribe(data =>{
        if(data.error === undefined){
          swal.fire({
            type: 'success',
            title: 'User Created Successfully'
            })
            this.router.navigate(['/login']);
        }else{
          swal.fire({
            type: 'error',
            title: data.error
            })
        }
    })

  }

}
