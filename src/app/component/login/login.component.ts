import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
     private authService:AuthService,
     private toastrService:ToastrService,
     private router: Router,
     private customerService: CustomerService,
     private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel: LoginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.localStorageService.setToken(response["token"]);
         this.setCustomerByEmail(loginModel.email); // Email ile customer'i çekesin. Single response 
        this.toastrService.info("Giriş Yaptınız","Başarılı")
        this.router.navigate(['/cars']);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

   setCustomerByEmail(email: string){ // Yorum satırlarını açarsın
    this.customerService.getCustomerByEmail(email).subscribe(response => {
     this.localStorageService.setCurrentCustomer(response.data);
     })
   }
}