import { Component } from '@angular/core';
import arrayWords from "../utils/words"
import arrayCities from "../utils/cities"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'word-generator';
  cities = ""
  words = ""
  limit = 10;
  handleSlideChange(event:any)
  {
    this.limit = event.target.value;

  }
 
  generate(){
    this.words = arrayWords.slice(0,this.limit).join(" ")
  }

  generateCities(){
     let x = 1+ Math.random()*10
   
     this.cities = arrayCities.slice(0,x).join()
  }

}
