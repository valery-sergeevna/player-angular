import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class RequestsService{

  constructor(private http: HttpClient) {}

  mainRequestPost(method, body): Observable<any>{
    const tvServer = 'https://tv-server.trinity-tv.net/server/';
    const service =  'TvServerService/';
    const url = tvServer + service + method + '.json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip'
    });
    return this.http.post<object>(url, body, {headers})
      .pipe(
        map(response => {
          console.log(method);
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  mainRequestGet(url): Observable<any>{
    const url_ = url.replace('http', 'https')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<[]>(url_, {headers})
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
