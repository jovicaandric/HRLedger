import { Injectable } from '@angular/core';
import { Company, Profile, Skill, Employment, Education, HRAgency, ValidationStatus } from '../models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HyperledgerService {

  constructor(private http: HttpClient) { }

  public path = environment.hyperledgerApi;

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.path + 'company');
  }

  public getHRs(): Observable<HRAgency[]> {
    return this.http.get<HRAgency[]>(this.path + 'HRAgency');
  }

  // tslint:disable:prefer-const

  // ***********************************************************************
  // profiles

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.path + 'Profile');
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.path + 'Profile/' + id);
  }

  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.path + 'Profile', profile);
  }


  getProfileAllInfo(id: string) {
    // this.getProfile(id).subscribe(profile => {

    // });
  }

  // ***************************************************

  /* CRUD za skils */
  createSkill(skill: Skill): Observable<Skill> {
    let uniceId = this.guid();
    skill.skillId = uniceId;
    let pom: any = Object.assign({}, skill);
    pom.profile = 'resource:org.hrledger.cv.Profile#' + skill.profile.email;
    console.log(pom);
    return this.http.post<Skill>(this.path + 'skill', pom);
  }
  createSkills(skills: Skill[]): Observable<Skill>[] {
    let toAdd: Observable<Skill>[] = [];
    for (let i = 0; i < skills.length; i++) {
      toAdd.push(this.createSkill(skills[i]));
    }
    return toAdd;
  }


  // getSkillsByProfileId(profileId: string)
  // {
  //   this.http
  // }

  // *******************************************************************

  // employments
  createEmployment(employment: Employment): Observable<Employment> {
    let id = this.guid();
    employment.employmentId = id;
    let pom: any = Object.assign({}, employment);
    pom.profile = 'resource:org.hrledger.cv.Profile#' + employment.profile.email;
    pom.company = 'resource:org.hrledger.cv.Company#' + employment.company.companyId;
    console.log(pom);
    return this.http.post<Employment>(this.path + 'employment', pom);
  }

  createEmployments(employments: Employment[]): Observable<Employment>[] {
    let toAdd: Observable<Employment>[] = [];
    for (let i = 0; i < employments.length; i++) {
      toAdd.push(this.createEmployment(employments[i]));
    }
    return toAdd;
  }

  // education

  createEducation(education: Education): Observable<Education> {
    education.educationId = this.guid();
    let pom: any = Object.assign({}, education);
    pom.profile = 'resource:org.hrledger.cv.Profile#' + education.profile.email;
    console.log("education", pom);
    return this.http.post<Education>(this.path + 'education', pom);
  }
  createEducations(educations: Education[]): Observable<Education>[] {
    let toAdd: Observable<Education>[] = [];
    for (let i = 0; i < educations.length; i++) {
      toAdd.push(this.createEducation(educations[i]));
    }
    return toAdd;
  }

  validateEducation(education: Education, validatedBy: String, status: ValidationStatus): Observable<Education> {
    if (validatedBy == null)
      validatedBy = "comtrade";
    let pom: any = Object.assign({}, education);
    pom.validatedBy = 'resource:org.hrledger.cv.Company#' + validatedBy;
    pom.status = status;
    console.log("education", pom);
    return this.http.put<Education>(this.path + 'education/' + education.educationId, pom);
  }

  validateEmployment(employment: Employment, validatedBy: String, status: ValidationStatus): Observable<Employment> {
    if (validatedBy == null)
      validatedBy = "comtrade";
    let pom: any = Object.assign({}, employment);
    pom.validatedBy = 'resource:org.hrledger.cv.Company#' + validatedBy;
    pom.status = status;
    console.log("education", pom);
    return this.http.put<Employment>(this.path + 'employment/' + employment.employmentId, pom);
  }


  // transactions

  transactionAddSkill(profile: Profile, skill: Skill): Observable<any> {
    const uniceId = this.guid();
    const timestamp = new Date();
    let body = {
      '$class': 'org.hrledger.cv.AddSkill',
      'skill': skill,
      'profile': profile,
      'transactionId': uniceId,
      'timestamp': timestamp
    };

    return this.http.post(this.path + 'AddSkill', body);
  }

  transactionRateSkill(company: String, skill: Skill, rate: number): Observable<any> {
    if (company == null)
      company = "comtrade";
    const uniceId = new Date().getDate() + '';
    const timestamp = new Date();
    let body = {
      '$class': 'org.hrledger.cv.RateSkill',
      'skill': 'resource:org.hrledger.cv.Skill#' + skill.skillId,
      'company': 'resource:org.hrledger.cv.Company#' + company,
      'rate': rate
    };

    return this.http.post<any>(this.path + 'RateSkill', body);
  }



  // ##################################################
  // queries

  queryGetProfileEmployments(profileId: string): Observable<Employment[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Employment[]>(this.path + 'queries/getProfileEmployments?profile=resource%3Aorg.hrledger.cv.Profile%23' + profileId);
  }

  queryGetProfileSkills(profileId: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.path + 'queries/getProfileSkills?profile=resource%3Aorg.hrledger.cv.Profile%23' + profileId);
  }


  queryGetProfileEducations(profileId: string): Observable<Education[]> {
    return this.http.get<Education[]>(this.path + 'queries/getProfleEducations?profile=resource%3Aorg.hrledger.cv.Profile%23' + profileId);
  }


  // ############################################################












  guid(): String {
    return this.s4() + this.s4() +
      '-' + this.s4() +
      '-' + this.s4() +
      '-' + this.s4() +
      '-' + this.s4()
      + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}



