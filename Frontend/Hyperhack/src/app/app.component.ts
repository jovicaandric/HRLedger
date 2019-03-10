import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute} from '@angular/router';    
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  isHR: boolean;

  constructor(public router: Router, private auth: AuthService) {
//    console.log(window.location.pathname);
   }

   isLogin() {
     return window.location.pathname === '/login';
   }

  ngOnInit() {

    var websocket;

    var openWebSocket = () => {
    var webSocketURL = environment.websocketURL;

    websocket = new WebSocket(webSocketURL);

    websocket.onopen = function () {
      
    };

    websocket.onclose = function() {
      openWebSocket();
    }

    websocket.onmessage = (event) => {
      var status = JSON.parse(event.data);
      console.log(status);
      
      if (status.$class === 'org.hrledger.cv.UpdateEmploymentEvent') {
        
      }
    };
  }

  openWebSocket();
    
  }



}
