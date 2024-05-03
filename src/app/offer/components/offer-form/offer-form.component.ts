import {Component, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { Offer } from "../../models/offer.model";
import { OfferApiService } from "../../services/offer-api.service";

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent {
  @ViewChild('offerForm') offerForm!: NgForm;
  offerData!: Offer;
  offers: any[] = [];

  constructor(private offerApiService: OfferApiService) {
    this.offerData = {} as Offer;
  }

  addItem() {
    this.offerApiService.createItem(this.offerData).subscribe((response: any) => {
      console.log(response);
      this.offers.push(response);
    });
  }

  onSubmit() {
    if (this.offerForm && this.offerForm.form && this.offerForm.form.valid) {
      this.addItem();
      this.offerForm.resetForm();
    } else {
      console.log('Invalid data');
    }
  }

  onCancel() {
    this.offerForm.resetForm();
  }
}
