import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usrName: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.usrName = localStorage.getItem('userName')
  }

  redirect(){
    //console.log(this.usrName)
    this.router.navigate(['/login'])
  }
  

}
