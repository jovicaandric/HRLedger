import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../models';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css']
})
export class CompanyTableComponent implements OnInit {

  @Input() companies: Company[];
  @Input() useHeader: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
