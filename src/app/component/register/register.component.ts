import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  password:string;
  verifyPassword:string;
  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private authService:AuthService,
    private route:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:[""],
      verifyPassword:[""]
    })
  }
  register(){
    if(this.registerForm.valid){
      if(this.password === this.verifyPassword){
        let registerModel = Object.assign(this.registerForm.value);
        this.authService.register(registerModel).subscribe(response=> {
          this.route.navigate(["cars"]);
          this.toastr.success("Giriş Yaptınız","Başarılı");
        },errorResponse=>{
          this.toastr.error(errorResponse.error.messages);
        });
      }else{
        this.toastr.error("Şifreler Doğrulanamadı. Tekrar Deneyiniz.","Hata")
      }
     
    }else{
      this.toastr.error("Doğrulama Hatası","Hata");
    }
    
  }

}