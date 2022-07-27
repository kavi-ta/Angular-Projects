import { Component, OnInit ,Input , OnChanges, SimpleChanges} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import {faThumbsUp, faThumbsDown, faShareSquare} from "@fortawesome/free-regular-svg-icons"
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
 @Input() post
  faThumbsUp=faThumbsUp
  faThumbsDown = faThumbsDown 
  faShareSquare = faShareSquare
  uid = null
  upvote = 0
  downvote = 0
  constructor(
    private auth:AuthService,
    private db: AngularFireDatabase
    
  ) { 
    this.auth.getUser().subscribe(
      (user)=>{
        this.uid = user?.uid
      }
    )

  }

  ngOnInit(): void {}


  // todo bug in updating the changes
  ngOnChanges(): void {
      // this reflects the changes from thedb
      if(this.post.vote){
        Object.values(this.post.vote).map(
          (val:any)=>{
            if(val.upvote){
              this.upvote+=1}
            if(val.downvote){
              this.downvote+=1
            }
          }
          
        )
      }
  }
  upvotePost(){
    console.log("UPVOTING")
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`)
    .set(
      // set creates a new property after dumping the existing properties
      {
        upvote:1
      }
    )
  }

  downvotePost(){
    console.log("DOWNVOTING")
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`)
    .set(
      // set creates a new property after dumping the existing properties
      {
        downvote:1
      }
    )
  }


  getInstaUrl(){
    // hiteshchoudharyofficial/?hl=en
    return `https://www.instagram.com/${this.post.instaId}`
  }


}
