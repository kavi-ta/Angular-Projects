import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  constructor(private auth:AuthService,
    private router:Router,
    private toastr:ToastrService) { }
  ngOnInit(): void {}

  onSubmit(f: NgForm){
    const {email,password} = f.form.value
    // do your checking
    this.auth.signIn(email,password)
    .then((res)=>{
      this.router.navigateByUrl("/")
      this.toastr.success("Sign in successful!")
    })
    .catch((err)=>{
      console.log(err)
      this.toastr.error("Signin failed")
    })
  }

}
