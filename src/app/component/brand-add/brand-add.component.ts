import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup
   constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
    brandName:["",Validators.required],
    // brandId:["",Validators.required]
   })
     }
     add(){
       if(this.brandAddForm.valid){
        let brandModel=Object.assign({}, this.brandAddForm.value)
        this.brandService.add(brandModel).subscribe(data=>{
         this.toastrService.success(data.message,"BAŞARILI")
        })
        }
       else{
         this.toastrService.error("HATA OLUŞTU")
       }
         }
  
    }