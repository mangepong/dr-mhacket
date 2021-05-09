import { Component, OnInit } from '@angular/core';
import { StartService } from '../start/start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],

})
export class StartComponent implements OnInit {

  constructor(
    private startService: StartService,
  ) { }

  ngOnInit() {

    
  }
  onSwipeLeft(evt) {
      const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';

      let card = document.getElementsByClassName('card')  as HTMLCollectionOf<HTMLElement>;
      card[0].classList.remove("swipe-right")

      card[0].classList.add("swipe-left")
      console.log(card[0].classList);
      console.log(x);
       setTimeout(function(){ 
        card[0].classList.remove("swipe-left");
        // TODO NEW INFO IN CLASS
      
      
      }, 500);
  }

  onSwipeRight(evt) {
      let card = document.getElementsByClassName('card')  as HTMLCollectionOf<HTMLElement>;

      const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
      card[0].classList.remove('swipe-left');

      card[0].classList.add("swipe-right")
      console.log(x);
      console.log(card);
      
      setTimeout(function(){ 
        card[0].classList.remove("swipe-right");
        // TODO NEW INFO IN CLASS
        // this.startService.APIcall(args);
      
      }, 500);
      
    }
  
}
