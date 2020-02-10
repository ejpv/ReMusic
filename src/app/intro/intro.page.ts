import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOps = {
    initialSlide: 0,
    slidePerView: 1,
    centeredSlides: true,
    speed: 300
  };
  constructor(private router: Router) { }

  finish() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
