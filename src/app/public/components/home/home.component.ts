import { Component, OnInit, ViewChild } from '@angular/core';
import {MatCardModule} from "@angular/material/card";

import {BusinessApiService} from "../../../business/services/business-api.service";
import {OfferApiService} from "../../../offer/services/offer-api.service";

//libreria lodash para clonar objetos
import * as _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  numberOfOffers: number = 0;
  offer: any[] = [];
  constructor(private offerApiService: OfferApiService) { }

  ngOnInit(): void {
    this.getNumberOfOffersByBusinessId(1);
  }

  getNumberOfOffersByBusinessId(id: number): void{

    this.offerApiService.getList().subscribe((response: any) => {
      this.offer = response;
      console.log(this.offer);
      if (this.offer.length > 0){
        this.numberOfOffers = this.offer.length;
      }
    });
  }
}
