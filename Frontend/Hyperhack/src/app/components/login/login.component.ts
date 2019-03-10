import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  email:string = "";
  password:string = "";

  ngOnInit() {

    $(document).ready(function () {
      if ($('.floating').length > 0) {
        $('.floating').on('focus blur', function (e) {
          $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
      }
    });

  }



  login()
  {
    if(this.authService.login(this.email,this.password))
    {
      this.router.navigate(['/dashboard']);
    } 
    else
    {
      console.log("Wrog username or password");
    }
  }

}
