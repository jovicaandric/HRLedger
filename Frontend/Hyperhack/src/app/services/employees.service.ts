import { Injectable } from '@angular/core';
import { Company, Profile } from '../models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public path = environment.hyperledgerApi;

  public cpn = [{
    companyID: '1',
    name: 'Kompanija 1',
    email: 'kompanija@email.com',
    website: 'website1.com'
  }, {
    companyID: '2',
    name: 'Kompanija 2',
    email: 'kompanija@email.com',
    website: 'website1.com'
  },
  {
    companyID: '3',
    name: 'Kompanija 3',
    email: 'kompanija@email.com',
    website: 'website1.com'
  }];

  public getCompanies(): Observable<Company[]> {
   // return Observable.of(this.cpn);
    return this.http.get<Company[]>(this.path + 'company');
  }

  addNewProfile(profile: Profile) {

  }










  /* CRUD za skils */
  createScill(skill: string): Observable<any>
  {
    const uniceId = new Date().getDate();
    let data: any = {
      '$class': 'org.hrledger.cv.Skill',
      'skillId': uniceId + '',
      'skillName': skill,
      'grades': [],
      'companies': []
    };


    return this.http.post(this.path + 'skill', data);
  }

  createScills(skills: string[]): Observable<any>[] {
    let toAdd: Observable<any>[] = [];
    for (let i = 0; i < skills.length; i++) {
      toAdd.push( this.createScill(skills[i]));
    }
    return toAdd;
  }


}
