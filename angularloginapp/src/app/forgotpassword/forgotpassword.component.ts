import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_service/authentication.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  newPasswordEntered: any;
  confirmPasswordEntered: any;

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get password() {
    return this.forgotPasswordForm.get('password');
  }

  get newPassword() {
    return this.forgotPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.forgotPasswordForm.get('confirmPassword');
  }

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
      //password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  onReset(){
    var swal: any = Swal.mixin({
      toast: true,
      width:'400px',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
      });

    //this.emailEntered = this.forgotPasswordForm.get('email')
    this.newPasswordEntered = this.forgotPasswordForm.value.newPassword
    this.confirmPasswordEntered = this.forgotPasswordForm.value.confirmPassword

    if(this.newPasswordEntered !== this.confirmPasswordEntered){
      swal.fire({
        type: 'error',
        title: 'New Password and Confirm Password should be same'
        })
    }else{
      this.authenticationService.resetPassword(this.forgotPasswordForm.value).pipe(first())
      .subscribe(
          data => {
            if(data.error === undefined || data.message === undefined){
            swal.fire({
              type: 'info',
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

}
