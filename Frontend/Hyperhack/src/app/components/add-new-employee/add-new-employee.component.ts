import { Component, OnInit } from '@angular/core';
import { Profile, Company, Employment, ValidationStatus, Education, EmploymentType, Project, Skill } from '../../models';
import { NgModel } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { HyperledgerService } from '../../services/hyperledger.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import swal from 'sweetalert2'
import * as $ from 'jquery';
import { JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent implements OnInit {

  public profile: Profile;
  public skills = [];
  public employments: Employment[] = [];
  public employment: Employment;


  startDateValue = '';
  endDateValue = '';

  public busy: Subscription;



  public education: Education[] = [];
  public edu: Education;

  public companies: Company[];
  constructor(private apiService: HyperledgerService) {
    this.profile = new Profile();
    this.employment = new Employment();
    this.edu = new Education();
  }
  // tslint:disable:prefer-const

  ngOnInit() {

    $(document).ready(function () {
      if ($('.floating').length > 0) {
        $('.floating').on('focus blur', function (e) {
          $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
      }
    });

    this.apiService.getCompanies().subscribe(res => {
      console.log(res);
      this.companies = res;
    });
  }

  addEmployee() {
    swal({
      title: 'Please wait!',
      text: 'Adding New Candidate in progres',
      onOpen: () => {
        swal.showLoading()
      }
    });
    console.log(this.profile);


    console.log(this.employment);

    this.apiService.createProfile(this.profile).subscribe(resProfile => {
      // tslint:disable-next-line:prefer-const
      console.log("profile res", resProfile);
      let ss = this.skillNamesToSkils(resProfile);
      let ssToCreate: Observable<Skill>[] = this.apiService.createSkills(ss);
      this.busy = Observable.forkJoin(ssToCreate).subscribe(response => {
        console.log("skill res", response);
        this.employments.forEach(x => x.profile = resProfile);

        let eToCreate = this.apiService.createEmployments(this.employments);
        Observable.forkJoin(eToCreate).subscribe(empRes => {
          console.log('emp res', empRes);
          this.education.forEach(x => x.profile = resProfile);
          let educationsToCreate = this.apiService.createEducations(this.education);
          Observable.forkJoin(educationsToCreate).subscribe(educationResponse => {
            console.log('Kreirano sve, education res', educationResponse);
            swal(
              'Success!',
              'Candidate successfully added!',
              'success'
            )
          });
        });
      });
    });
  }

  addEmployment() {
    console.log(this.employment);
    if (this.employment.company.companyId != null) {
      this.employment.employmentType = EmploymentType.Employment;
    } else {
      this.employment.employmentType = EmploymentType.Project;
    }
    let pom = JSON.parse(JSON.stringify(this.employment));
    this.employments.push(pom);
    this.employment = new Employment();
  }

  addEducation() {
    console.log(this.edu);
    let pom = JSON.parse(JSON.stringify(this.edu));
    this.education.push(pom);
    this.edu = new Education();
  }

  skillNamesToSkils(profile: Profile): Skill[] {
    let array: Skill[] = [];
    this.skills.forEach(x => {
      let sk = new Skill();
      sk.companies = [];
      sk.grades = [];
      sk.profile = profile;
      sk.skillName = x;
      array.push(sk);
    });

    return array;
  }

  clearEmployee() {
    this.profile = new Profile();
  }
}

// potrebe transakcije
// updateEducation
// updateEmployment
// RateSkill

