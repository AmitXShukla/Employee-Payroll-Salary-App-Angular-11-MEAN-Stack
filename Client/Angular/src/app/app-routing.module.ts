import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutusComponent }   from './aboutus/aboutus.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/login/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './services/auth-guard.service';
// setup pages
import { JobCodeComponent } from './setup/jobcode.component';
import { LeaveCodeComponent } from './setup/leavecode.component';
import { SalaryCodeComponent } from './setup/salarycode.component';
// manage pages
import { VoucherComponent } from './manage/voucher.component';
import { EmployeeComponent } from './manage/employee.component';
import { SalaryComponent } from './manage/salary.component';

const routes: Routes = [
  { path: '', redirectTo: '/aboutus', pathMatch: 'full' },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'jobcode', component: JobCodeComponent, canActivate: [AuthGuard] },
  { path: 'leavecode', component: LeaveCodeComponent, canActivate: [AuthGuard] },
  { path: 'salarycode', component: SalaryCodeComponent, canActivate: [AuthGuard] },
  { path: 'voucher', component: VoucherComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'salary/:id', component: SalaryComponent, canActivate: [AuthGuard] },
  { path: 'salary', component: SalaryComponent, canActivate: [AuthGuard] },
  //{ path: 'jobcode-search', component: JobCodeSrchComponent, canActivate: [AuthGuard] },
  //{ path: 'jobcode-add', component: JobCodeAddComponent, canActivate: [AuthGuard] },
  //{ path: 'jobcode-edit/:id', component: JobCodeSrchComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/aboutus', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}