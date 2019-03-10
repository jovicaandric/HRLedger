import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models';
import { HyperledgerService } from '../../services/hyperledger.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public employees: Profile[];

  showAdvenced = false;

  employeeFilter = '';
  educationsFilter: string = '';
  educationsFilters: string[] = [];

  employmentFilter: string = '';
  employmentFilters: string[] = [];

  skillFilter: string = '';
  skillFilters: string[] = [];


  constructor(private apiService: HyperledgerService) {

  }

  addEducation() {
    this.educationsFilters.push(this.educationsFilter);
    this.educationsFilter = '';
    console.log(this.educationsFilters);
  }

  addEmployment() {
    this.employmentFilters.push(this.employmentFilter);
    this.employmentFilter = '';
  }
  addSkill() {
    this.skillFilters.push(this.skillFilter);
    this.skillFilter = '';
  }

  ngOnInit() {
    $(document).ready(function () {
      if ($('.floating').length > 0) {
        $('.floating').on('focus blur', function (e) {
          $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
      }
    });

    this.apiService.getAllProfiles().subscribe(res => {
      this.employees = res;
    });
  }

}
