import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

import {Business} from "../models/business.model";

@Injectable({
  providedIn: 'root'
})
export class BusinessApiService {

  baseUrl: string = environment.baseURL;

  extraUrl: string = 'business/';
  constructor(private http:HttpClient) { }

  //Options for HTTP requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side errors or network issues.
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Errors returned by the backend.
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return an Observable that emits an error message.
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  getItem(index:any){
    return this.http.get<Business>(this.baseUrl + this.extraUrl + index)
  }

  getList(): Observable<Business> {
    return this.http
      .get<Business>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  createItem(item: any): Observable<Business> {
    console.log(item);
    return this.http
      .post<Business>(this.baseUrl, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id: string, item: any): Observable<Business> {

    return this.http
      .put<Business>(this.baseUrl + this.extraUrl + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: any): Observable<Business> {
    console.log(this.baseUrl + this.extraUrl + id)
    console.log(id)
    return this.http
      .delete<Business>(this.baseUrl + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
