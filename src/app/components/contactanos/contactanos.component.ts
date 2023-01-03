import { Component, OnInit } from '@angular/core';
import {faLocationArrow,faClock,faEnvelope,faPhone,faMobile } from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})

export class ContactanosComponent implements OnInit {
  faLocationArrow = faLocationArrow;
  faClock = faClock;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMobile = faMobile;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;

  constructor() { }

  ngOnInit(): void {
  }

}
