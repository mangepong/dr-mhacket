import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(
        // private router: Router,
        // private http: HttpClient
    ) { }


  // APIcall(deposit) {
  //     return this.http.post(`https://project-api.mangepongjs.me/deposit`, {deposit: deposit});
  // }
}
