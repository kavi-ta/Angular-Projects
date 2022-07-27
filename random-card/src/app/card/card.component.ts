import { Component, OnInit , Input} from '@angular/core';
import {faEnvelope,faMapMarkedAlt,faPhone,faDatabase} from '@fortawesome/free-solid-svg-icons'
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  faEnvelope = faEnvelope
  faMapMarkedAlt=  faMapMarkedAlt
  faPhone= faPhone
  faDatabase = faDatabase

  @Input() user;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  


}
