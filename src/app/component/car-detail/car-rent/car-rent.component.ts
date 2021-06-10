import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  currentCustomer: Customer;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private router: Router,
    private localstorageService: LocalStorageService,
    private carService: CarService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('carId'));
    this.currentCustomer = this.localstorageService.getCurrentCustomer();
    this.createRentalAddForm();
  }

  createRentalAddForm() {
    this.addRentalForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: ["", Validators.required],
      rentDate: ['', [Validators.required]],
      returnDate: ['', Validators.required]
    });
  }

  sendData() {
    this.checkFindexPoint()
    let rentalModel = this.addRentalForm.value;
    this.rentalService.setRentableCar(rentalModel);
    this.router.navigate(['/card']);
  }

  checkFindexPoint() {
    if (this.currentCustomer.customerFindexPoint == 0) {
      this.toastrService.warning("Findex puanınız bulunamadı", "Dikkat")
    } else {
      this.carService.getCarByCarId(this.carId).subscribe(response => {
        const car = response.data

        if (car.carFindexPoint > this.currentCustomer.customerFindexPoint) {
          this.toastrService.warning("Findex puanınız yetersiz", "Dikkat")
        }
      });
    }
  }
}