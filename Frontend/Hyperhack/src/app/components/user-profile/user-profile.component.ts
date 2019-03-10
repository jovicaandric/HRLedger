import { Component, OnInit } from '@angular/core';
import { Employment, ValidationStatus, Education, Profile, Company, Skill, EmploymentType } from '../../models';
import { HyperledgerService } from '../../services/hyperledger.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private apiService: HyperledgerService, private route: ActivatedRoute) {

  }

  public employee: any;
  public temp: any;
  public email: string;
  public busy: Subscription;
  public busy2: Subscription;
  public busy3: Subscription;
  public busy4: Subscription;
  public ocene: number[] = [1, 2, 3, 4, 5];

  employmentToAdd = new Employment();
  educationToAdd = new Education();
  companies: Company[];

  ngOnInit() {
    this.email = this.route.snapshot.params.email;
    this.apiService.getCompanies().subscribe(comRes => {
      this.companies = comRes;
    });


    this.apiService.getProfile(this.email).subscribe(res => {
      this.temp = res;

      this.busy = this.apiService.queryGetProfileEmployments(this.email).subscribe(res2 => {
        this.temp.employments = res2;

        this.busy = this.apiService.queryGetProfileEducations(this.email).subscribe(res3 => {
          this.temp.education = res3;

          this.busy = this.apiService.queryGetProfileSkills(this.email).subscribe(res4 => {
            this.temp.skills = res4;
            this.employee = this.temp;
            this.refreshSkills();

            console.log(this.employee);
          });
        });
      });
    });
  }

  refreshSkills() {
    for (let i = 0; i < this.employee.skills.length; i++) {
      this.employee.skills[i].avg = this.getAverage(this.employee.skills[i]);
    }
    console.log(this.employee.skills);
  }

  getAverage(skill: Skill) {
    let n = skill.grades.length;
    console.log(skill.grades);
    if (n > 0) {
      let sum: number = 0;
      for (let i = 0; i < n; i++) {
        sum += skill.grades[i];
      }
      let avg = sum * 1.0 / n;
      return avg.toFixed(2) + '/5 (' + n + ')';
    }
    return '--/0 (0)';
  }

  rateSkill(s: Skill, grade: number) {
    this.busy4 = this.apiService.transactionRateSkill(localStorage.getItem('companyId'), s, grade).subscribe(res => {
      console.log(res);
      s.grades.push(res.rate);
      this.refreshSkills();
    })
  }
  validateEducation(e: Education, status: ValidationStatus) {
    console.log('validira education');
    this.busy2 = this.apiService.validateEducation(e, localStorage.getItem("companyId"), status).subscribe(res => {
      console.log(res);
      e.status = res.status;
    });
  }
  validateEmployment(e: Employment, status: ValidationStatus) {
    console.log('validira education');
    this.busy3 = this.apiService.validateEmployment(e, localStorage.getItem("companyId"), status).subscribe(res => {
      console.log(res);
      e.status = res.status;
    });
  }


  addEducation() {
    console.log(this.educationToAdd);
    this.educationToAdd.profile = new Profile();
    this.educationToAdd.profile.email = this.email;
    this.apiService.createEducation(this.educationToAdd).subscribe(res => {
      console.log(res);
      this.employee.education.push(res);
    });
  }

  addEmployment() {
    console.log(this.employmentToAdd);
    this.employmentToAdd.profile = new Profile();
    this.employmentToAdd.profile.email = this.email;
    this.employmentToAdd.company.companyId = localStorage.getItem('companyId');
    this.employmentToAdd.employmentType = EmploymentType.Employment;

    this.apiService.createEmployment(this.employmentToAdd).subscribe(res => {
      console.log(res);
      this.employee.employments.push(res);
    });
    this.employmentToAdd = new Employment();
  }
}
