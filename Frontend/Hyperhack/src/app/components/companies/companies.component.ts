import { Component, OnInit } from '@angular/core';
import { Company } from '../../models';
import { HyperledgerService } from '../../services/hyperledger.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {


  companies: Company[];
  busy: Subscription;

  constructor(private hyperledgerService: HyperledgerService) { }

  ngOnInit() {
    this.busy = this.hyperledgerService.getCompanies().subscribe(c => {
      this.companies = c;
    });
  }

}
