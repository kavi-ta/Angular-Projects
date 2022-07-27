import { Component, OnInit } from '@angular/core';
// angular form
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// service
import { AuthService } from 'src/app/services/auth.service';
import {finalize} from "rxjs/operators"
// firebase
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// browser image resizer
import {readAndCompressImage} from "browser-image-resizer"
import { imageConfig } from 'src/utils/config';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture:string = 'https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png'
  uploadPercent:number=null
  constructor(
    private router: Router,
    private auth:AuthService,
    private storage:AngularFireStorage,
    private db:AngularFireDatabase,
    private toastr:ToastrService
    // becz of the constructor all the services are available as soon as the object is created
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    // order doesnt matter in destructuring
    const {name,email,username,password,country, bio} = f.form.value
    // todo : futher sanitization/validations of the data do here 
    this.auth.signup(email,password)
    .then(
      (res)=>{
        console.log(res)
        const {uid} = res.user
        this.db.object(`/users/${uid}`)
        .set({
          id:uid,
          name:name,
          email:email,
          instaUserName:username,
          country:country,
          bio:bio,
          picture:this.picture
        })
      }
    )
    .then(
      ()=>{
        // after use is created => redirect it to home
        this.router.navigateByUrl("/")
        this.toastr.success("Signin success")
      }
    )
    .catch(
      (err)=>{
        this.toastr.error("Sign up failed")
      }
    )
  }

  async uploadFile(event){
    const file = event.target.files[0]
    let resizedImage = await readAndCompressImage(file,imageConfig)
    const filePath = file.name //rename the image with TODO:uuid
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath,resizedImage)
    task.percentageChanges().subscribe(
      (percentage)=>{
        this.uploadPercent =  percentage
      })
    // snapshotchanges is an observable=> events that can be monitored
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(
          (url)=>{
            this.picture = url
            this.toastr.success("image upload success")
          }
        )
      })
    )
    .subscribe()
  }


  
}
