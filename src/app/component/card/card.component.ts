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


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  rental: Rental;
  customer: Customer;
  cars: Car;

  paymentAmount: number = 0;
  cardExist: boolean = false;
  getCustomerId: number;
  carId: number;
  credit : Card[];
  card:Card;
  dataLoaded=false;

  cardId: number;
  cardNumber: string;
  cardCvv: number;
  moneyInTheCard: number;
  expirationDate:number;
  nameOnTheCard: string;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private carService: CarService,
    private router: Router,
    private creditCardService: CardService,
    private rentalService: RentalService,
    private toastrService: ToastrService,


  ) { }

  ngOnInit(): void {
    console.log("ödeme sayfas");
    console.log(this.getRentableCar())
    //console.log(this.calculatePayment())
    this.activatedRoute.params.subscribe(params => {
      // if(params["carId"]){
      //   this.getCarDetail(params["carId"]);
      // }
      this.getCarDetail()
      this.getCreditCard()

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

      this.paymentAmount = rentDays * this.cars.dailyPrice;
      if (this.paymentAmount == 0) {
        this.paymentAmount = this.cars.dailyPrice / 2
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

  getCarDetail() {
    this.carService.getCarByCarId(this.getRentableCar().carId).subscribe(response => {
      this.cars = response.data[0]
      this.calculatePayment()
    })

  }
  getCarsById(carId: number) {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data.find(car => this.getRentableCar().carId);
      this.paymentAmount
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
      NameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCvv: this.cardCvv,
      cardId:this.cardId,
      MoneyInTheCard:this.moneyInTheCard
    }

    this.cardExist = await this.isCardExist(verifyCreditCard);
    if(this.cardExist){
      this.card = await this.getCreditCardByCardNumber(this.cardNumber);
      
      if(this.card.MoneyInTheCard as number >= this.paymentAmount){
        //this.card.MoneyInTheCard = this.creditCardService  - this.paymentAmount;
        this.updateCard(verifyCreditCard);
        this.rentalService.addRental(this.rental);
         this.toastrService.success('Arabayı kiraladınız','İşlem başarılı');
      }else{
        // this.toastrService.error('Kartınızda yeterli bakiye yoktur','Hata');
      }
    }else{
      // this.toastrService.error('Bankanız bilgilerinizi onaylamadı','Hata');
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
