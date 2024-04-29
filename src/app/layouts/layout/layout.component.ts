import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isMobileView: Boolean = false;


  constructor() { }

  ngOnInit() {

  }

  onResize(event: any) {
    var width = event.target.innerWidth;
    console.log(width);
    if (width < 991) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }
}
