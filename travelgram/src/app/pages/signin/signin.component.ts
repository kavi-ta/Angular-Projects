import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private router: Router,
    private auth:AuthService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    // order doesnt matter in destructuring
    const {name,email,username,password,country, bio} = f.form.value
    // todo : futher sanitization/validations of the data do here 
    this.auth.signIn(email,password)
    .then(
      (res)=>{
        // after use is created => redirect it to home
        this.router.navigateByUrl("/")
        this.toastr.success("Signin success")
      }
    )
    .catch(
      (err)=>{
        this.toastr.error(err.message,"",{
          closeButton:true
        })
      }
    )
  }
}
