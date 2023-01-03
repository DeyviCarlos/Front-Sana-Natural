import { Component, OnInit } from '@angular/core';
import {faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  arrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
