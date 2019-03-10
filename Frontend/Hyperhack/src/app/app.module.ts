import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLinkActive } from '@angular/router';
import { AppComponent } from './app.component';
import { AddNewEmployeeComponent } from './components/add-new-employee/add-new-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { EmployeesService } from './services/employees.service';
import { HyperledgerService } from './services/hyperledger.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ShowAgenciesComponent } from './components/show-agencies/show-agencies.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { BusyModule } from 'angular2-busy';
import { CompanyTableComponent } from './components/company-table/company-table.component';
import { FilterProfilesPipe } from './filter-profiles.pipe';

const appRoutes: Routes = [
  { path: 'add-new-employee', component: AddNewEmployeeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'profile/:email', component: UserProfileComponent },
  { path: 'agencies', component: ShowAgenciesComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AddNewEmployeeComponent,
    DashboardComponent,
    EmployeesComponent,
    UserProfileComponent,
    LoginComponent,
    ShowAgenciesComponent,
    CompaniesComponent,
    CompanyTableComponent,
    FilterProfilesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    BusyModule
  ],
  providers: [EmployeesService, HyperledgerService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
