import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  firstname:any;
  ngOnInit(): void {
   this.firstname= sessionStorage.getItem('firstname')
  }
}
