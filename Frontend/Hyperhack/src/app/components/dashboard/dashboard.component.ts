import { Component, OnInit } from '@angular/core';
import { HyperledgerService } from '../../services/hyperledger.service';
import { Company, HRAgency, Profile } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: HyperledgerService) { }

  companies: Company[];
  hrAgenciesCount: number;

  profiles: Profile[];
  kompanije: Subscription;
  kandidati: Subscription;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.kompanije = this.apiService.getCompanies().subscribe(comps => {
      this.companies = comps;
    });
    // this.apiService.getHRs().subscribe(hrs => {
    //   this.hrAgenciesCount = hrs.length;
    // });

    this.kandidati = this.apiService.getAllProfiles().subscribe(resposne => {
      this.profiles = resposne;
    });
  }

}
