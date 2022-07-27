import { Component, OnInit } from '@angular/core';
// angular form
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// service
import { AuthService } from 'src/app/services/auth.service';
import {finalize, takeLast} from "rxjs/operators"
// firebase
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// browser image resizer
import {readAndCompressImage} from "browser-image-resizer"
import { imageConfig } from 'src/utils/config';
import {v4 as uuidv4} from "uuid"

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  locationName:string
  description:string
  picture:string = null
  user=null
  uploadPercent:number = 0
  constructor(
    private router: Router,
    private auth:AuthService,
    private storage:AngularFireStorage,
    private db:AngularFireDatabase,
    private toastr:ToastrService
    // becz of the constructor all the services are available as soon as the object is created
  ) { 

    this.auth.getUser().subscribe(
      (user)=>{
        this.db.object(`/users/${user.uid}`)
        .valueChanges()
        .subscribe(
          (user)=>{
            this.user = user;
          }
        )
      }
    )
  }

  ngOnInit(): void {
  }


  onSubmit(){
    const uid = uuidv4()

    this.db.object(`/posts/${uid}`)
    .set({
      id:uid,
      locationName:this.locationName,
      description:this.description,
      picture:this.picture,
      by:this.user.name,
      instaId:this.user.instaUserName,
      date: Date.now()
    })
    .then(
      (res)=>{
        
      this.toastr.success("Post added successfully")
      this.router.navigateByUrl('/home')
      }
    )
    .catch(
      (err)=>{
        this.toastr.error("Oops")
      }
    )
    
  }

  async uploadFile(event){
    const file = event.target.files[0]
    let resizedImage = await readAndCompressImage(file,imageConfig)
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath,resizedImage)

    task.percentageChanges().subscribe(
      (percentage)=>{
        this.uploadPercent = percentage
      }
    )

    task.snapshotChanges()
    .pipe(
      finalize(
        ()=>{
          fileRef.getDownloadURL().subscribe(
            (url)=>{
              this.picture = url
              this.toastr.success("Image upload success")
            }
          )
        }
      )
    )
    .subscribe()
  }
}
