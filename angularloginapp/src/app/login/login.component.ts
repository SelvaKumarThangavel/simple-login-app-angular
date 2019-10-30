import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  //returnUrl: string;

   get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder, 
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute){
        // redirect to home if already logged in
       /*  if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/home']);
        } */
    }

  ngOnInit() {
     this.loginForm = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  // get return url from route parameters or default to '/'
  //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(){
    //console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value).pipe(first())
    .subscribe(
        data => {
          console.log(data)
            this.router.navigate(['/home']);
        }
      //error => console.log('Error ::: ',error)
    )

  }

}
