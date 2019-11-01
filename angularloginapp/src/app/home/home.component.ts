import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() usrName: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(){
    this.router.navigate(['/login'])
  }
  

}
