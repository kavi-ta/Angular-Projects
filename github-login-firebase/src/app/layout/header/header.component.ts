import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import {faDatabase, faMoon} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email = null;
  faMoon= faMoon
  dark= false
  constructor(
    private auth:AuthService,
    private toastr: ToastrService,
    private router:Router) { 
      auth.getUser().subscribe((user)=>{
        this.email = user?.email
      })
    }

  ngOnInit(): void {
  }

  async handleSignout(){
    try{
     const res = await this.auth.signOut()
     this.router.navigateByUrl('/signin')
     this.toastr.info("Login again to continue")
     this.email = null;
    }catch(error){
      this.toastr.error("Something is wrong")
    }
  }

  darkMode(){
    this.dark = true
  }
 
}
