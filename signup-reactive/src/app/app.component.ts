import { Component , OnDestroy, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms"
import { PasswordChecker } from './custom-validators/password-checker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'signup-reactive';
  registerForm :FormGroup;
  submitted=false;


  constructor(private formbuilder:FormBuilder){}
  
  ngOnInit():void{
    this.registerForm = this.formbuilder.group({
      firstName : ['',Validators.required],
      lastName :['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],
      acceptTandC:[false,Validators.requiredTrue]
    }, {
      validators:PasswordChecker('password','confirmPassword')
    }) //this groups all the fields of the form
  }

  onSubmit(){
    this.submitted=true;
    if(this.registerForm.invalid){
      return;
    }
    console.table(this.registerForm)
    console.table(this.registerForm.value)
    alert("success signup\n"+JSON.stringify(this.registerForm.value))
  }
  onReset(){
    this.submitted = false;
    
    this.registerForm.reset()
  }

  get h(){
    return this.registerForm.controls
  }
}
