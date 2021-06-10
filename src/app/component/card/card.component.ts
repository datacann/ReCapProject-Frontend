import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CardService } from 'src/app/services/card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { LocalStorageService } from 'src/app/services/local-storage.service';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  rental: Rental;
  customer: Customer;
  car: Car;

  paymentAmount: number = 0;
  cardExist: boolean = false;
  getCustomerId: number;
  carId: number;
  credit : Card[];
  card:Card;
  dataLoaded=false;

  cardId: number;
  cardNumber: string;
  cardCvv: string;
  moneyInTheCard: number;
  expirationDate:string;
  nameOnTheCard: string;
  

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private carService: CarService,
    private router: Router,
    private creditCardService: CardService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,


  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarsById(this.getRentableCar().carId);
      this.getCreditCard();
    });
  }


  getRentableCar() {
    return this.rentalService.getRentableCar();
  }

  calculatePayment() {
    if (this.getRentableCar().returnDate != null) {
      var returnDate = new Date(this.getRentableCar().returnDate.toString());
      var rentDate = new Date(this.getRentableCar().rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();


      var rentDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.paymentAmount = rentDays * this.car.dailyPrice;
      if (this.paymentAmount == 0) {
        this.paymentAmount = this.car.dailyPrice / 2
        this.toastrService.error("bana ne bi günlük kiralamsaydın","uyarı")
      }
      if(this.paymentAmount <= 0){
        this.router.navigate(['/cars']);
        this.toastrService.error("ödeme tutarı negatif olamaz,araç sayfasına yönlendiriliyorsunuz","uyarı")
       }
       if(this.paymentAmount > 0){
        this.toastrService.success("ödeme sayfasına yönlendiriliyorsunuz")
       }
    }
  }

 

  getCarsById(carId: number) {
    this.carService.getCarByCarId(carId).subscribe(response => {
      this.car = response.data;
      this.calculatePayment();
    })
  }


  getCreditCard() {

    this.creditCardService.getCreditCard().subscribe((response) => {
      this.credit = response.data;
      this.dataLoaded = true;
    });
  }


  async rentACar(){
    let verifyCreditCard:Card ={
      nameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCvv: this.cardCvv,
      cardId:this.cardId,
      moneyInTheCard:this.moneyInTheCard,
      customerId:this.localStorageService.getCurrentCustomer().id
    }

    // if(save){ // Checkbox ekledikten sonra yourm satırı şeyisilerini kaldır
    //   this.creditCardService.add(cardModel).subscribe();
    // }

    this.cardExist = await this.isCardExist(verifyCreditCard);
    if(this.cardExist){
      this.card = await this.getCreditCardByCardNumber(this.cardNumber);
      
      if(this.card.moneyInTheCard as number >= this.paymentAmount){
        this.card.moneyInTheCard = this.card.moneyInTheCard as number - this.paymentAmount;
        this.updateCard(verifyCreditCard);
        this.rentalService.addRental(this.rental);
         this.toastrService.success('Arabayı kiraladınız','İşlem başarılı');
      }else{
        this.toastrService.error('Kartınızda yeterli bakiye yoktur','Hata');
      }
    }else{
        this.toastrService.error('Bankanız bilgilerinizi onaylamadı','Hata');
    }
  }

  async isCardExist(card:Card){
    return (await this.creditCardService.verifyCard(card).toPromise()).success;
  }

  async getCreditCardByCardNumber(cardNumber:string){
    return (await this.creditCardService.getByCardNumber(cardNumber).toPromise()).data[0];
  }

  updateCard(card:Card){
    this.creditCardService.updateCard(card);
  }

  
}
