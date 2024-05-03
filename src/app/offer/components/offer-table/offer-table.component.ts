import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from "@angular/common/http";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {Offer} from "../../models/offer.model";
import { OfferApiService } from "../../services/offer-api.service";

//libreria lodash para clonar objetos
import * as _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer-table',
  standalone: true,
  imports: [
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './offer-table.component.html',
  styleUrl: './offer-table.component.css'
})
export class OfferTableComponent implements OnInit{
  @ViewChild('offerForm', {static: false})
  offerForm!: NgForm;


  offerData!: Offer;

  data: any = [];
  dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['id','title', 'description', 'points', 'businessId', 'actions'];


  isEditMode = false;


  constructor(private offerApiService: OfferApiService, private  router: Router) {
    this.offerData = {} as Offer;
  }
  ngOnInit(): void {
    this.getAllOffers();
  }


  getAllOffers() {
    this.offerApiService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem() {
  }

  deleteItem(id:string){
    this.offerApiService.deleteItem(id).subscribe(()=>{
      this.dataSource.data=this.dataSource.data.filter((o:any)=>o.id!==id);
    });
  }

  createOffer() {
    this.router.navigate(['admin/offers/new']);
  }
}
