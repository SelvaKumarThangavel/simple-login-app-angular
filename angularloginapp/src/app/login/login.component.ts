import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  //returnUrl: string;
  userName: string;
  public show: boolean = false;
  public buttonName: any = 'Hide';
  
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
     var swal: any = Swal.mixin({
      toast: true,
      width:'400px',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
      });
    //this.userName = this.loginForm.value.email;
    this.authenticationService.login(this.loginForm.value).pipe(first())
    .subscribe(
        data => {
          if(data.error === undefined){
            this.authenticationService.getUserName(this.loginForm.value).pipe(first())
            .subscribe(
              userName => {
                this.userName = userName;
              }
            )
            //console.log(data)
            this.router.navigate(['/home']);
          }else{
             swal.fire({
              type: 'error',
              title: data.error
              }) 
          }
        }
    )
    this.show = !this.show;
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
    

  }

}
