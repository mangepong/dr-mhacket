import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    
    getMovie(id) {
        return this.http.get("http://www.omdbapi.com/?i=tt" + id + "&apikey=6ddec0db");
    }
}
