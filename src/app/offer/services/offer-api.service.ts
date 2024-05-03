import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

import {Offer} from "../models/offer.model";
@Injectable({
  providedIn: 'root'
})
export class OfferApiService {

  baseUrl: string = environment.baseURL;

  extraUrl: string = 'offers/';
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
    return this.http.get<Offer>(this.baseUrl + this.extraUrl + index)
  }

  getList(): Observable<Offer> {
    return this.http
      .get<Offer>(this.baseUrl + this.extraUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  createItem(item: any): Observable<Offer> {
    console.log(item);
    return this.http
      .post<Offer>(this.baseUrl + this.extraUrl, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id: string, item: any): Observable<Offer> {

    return this.http
      .put<Offer>(this.baseUrl + this.extraUrl + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: any): Observable<Offer> {
    console.log(this.baseUrl + this.extraUrl + id)
    console.log(id)
    return this.http
      .delete<Offer>(this.baseUrl + this.extraUrl + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
