import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {

  rental: Rental;
  addRentalForm: FormGroup;
  carId: number

  constructor(private formBuilder: FormBuilder,
     private activatedRoute: ActivatedRoute,
     private rentalService: RentalService,
     private router: Router) { }

  ngOnInit(): void {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('carId'));
    this.createRentalAddForm();
  }

  createRentalAddForm(){
    this.addRentalForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: [9, Validators.required], // Login işleminden sonra, mevcut müşterinin id'si olacak
      rentDate: ['', [Validators.required]],
      returnDate: ['', Validators.required]
   });
  }

  sendData(){
    let rentalModel = this.addRentalForm.value;
    this.rentalService.setRentableCar(rentalModel);
    this.router.navigate(['/card']);
  }
}