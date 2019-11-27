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
  signupRequest : any;

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

    this.signupRequest = {email:this.registrationForm.value.email, password: this.registrationForm.value.password, username: this.registrationForm.value.username}

    this.authenticationService.newUserRegister(this.signupRequest).pipe(first())
    .subscribe(data =>{
        if(data.success === true){
          swal.fire({
            type: 'success',
            title: data.message
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
