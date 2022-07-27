import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }
  signUp(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
    // return an observable that can be subscribed
  }

  signIn(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password)
    // returns an observable.
  }

  getUser(){
    return this.auth.authState;
    // this is a big object returned by firebase after successful signin
  }

  signOut(){
    return this.auth.signOut()
  }
}
