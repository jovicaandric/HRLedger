import { Component, OnInit } from '@angular/core';
import { HRAgency } from '../../models';
import { Subscription } from 'rxjs/Rx';
import { HyperledgerService } from '../../services/hyperledger.service';

@Component({
  selector: 'app-show-agencies',
  templateUrl: './show-agencies.component.html',
  styleUrls: ['./show-agencies.component.css']
})
export class ShowAgenciesComponent implements OnInit {

  hrs: HRAgency[];
  busy: Subscription;

  constructor(private hyperledgerService: HyperledgerService) { }

  ngOnInit() {
    this.busy = this.hyperledgerService.getHRs().subscribe(hr => {
      this.hrs = hr;
    });
  }

}
