import { Component, OnInit } from '@angular/core';
import { StartService } from '../start/start.service';
import movies from "../../assets/movies/small.json";
import movieid from "../../assets/movies/movieid.json";
// import liked from "../../assets/movies/liked.json";
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],

})
export class StartComponent implements OnInit {

  movie: any;
  liked: any;
  disliked: any;
  
  constructor(
    private startService: StartService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.liked = [];
    this.disliked = [];
    this.newMovie("start");
    localStorage.setItem("allmovies", JSON.stringify(movieid));
  }

  openDialog() {
    this.dialog.open(StartDialog);
  }

  onSwipeLeft(evt) {
      evt = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
      let card = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>;
      

      let classes = card[0].classList["value"].split(" ");

      if (classes.includes("swipe-right")) {
        card[0].classList.remove("swipe-right");
      }

      card[0].classList.add("swipe-left")
      this.disliked.push(this.movie);
      localStorage.setItem("disliked", JSON.stringify(this.disliked));

      var that = this;
      setTimeout(function(){
        card[0].classList.remove("swipe-left");
        that.newMovie(evt);
      }, 500);
  }

  onSwipeRight(evt) {
      evt = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
      console.log(evt);
      let card = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>;

      let classes = card[0].classList["value"].split(" ");

      if (classes.includes("swipe-left")) {
        card[0].classList.remove("swipe-left");
      } 
      card[0].classList.add("swipe-right")
      this.liked.push(this.movie);
      localStorage.setItem("liked", JSON.stringify(this.liked));
      console.log(this.liked);

      var that = this;
      setTimeout(function(){
        card[0].classList.remove("swipe-right");
        that.newMovie(evt);
      }, 500);
    }

  newMovie(evt) {
    let roll = false;
    let length = movieid.movieid.length;
    let x = Math.floor(Math.random() * length);

    
    if (evt == "left") {
       for (let x in this.disliked) {
        console.log("DISLIKE");
        if (this.disliked[x].imdbID == "tt" + movieid.movieid[x].imdbId) {
          console.log("HÄMTAR NY CUZ DEN MATCHAR");
          this.fetchMovie(Math.floor(Math.random() * length), evt);
        } else {
          console.log("DISLIKE ROLL EJ MATCH");
          roll = true;
        }
      }
    } else {
      this.startService.getMovie(movieid.movieid[x].imdbId)
                .subscribe((data) => {
                    this.movie = data;
        });
    }

    if (evt == "right") {
      for (let x in this.liked) {
        console.log("LIKE");
        if (this.liked[x].imdbID == "tt" + movieid.movieid[x].imdbId) {
          console.log("HÄMTAR NY CUZ DEN MATCHAR");
          this.fetchMovie(Math.floor(Math.random() * length), evt);
        } else {
          console.log("LIKE ROLL EJ MATCH");
          roll = true;
        }
      }
    } else {
      this.startService.getMovie(movieid.movieid[x].imdbId)
                .subscribe((data) => {
                    this.movie = data;
        });
    }
    console.log(this.movie);

  }



  fetchMovie(id, evt) {
    this.startService.getMovie(movieid.movieid[id].imdbId)
                .subscribe((data) => {
                    this.movie = data;
        });
    this.newMovie(evt);
  }

}

@Component({
  selector: 'start.dialog',
  templateUrl: './start.dialog.html',
})
export class StartDialog {
  liked: any;

  ngOnInit() {
    console.log(localStorage);
    this.liked = JSON.parse(localStorage.getItem('liked'));    
    console.log(this.liked);
  }

  clear() {
    localStorage.clear();
  }
}