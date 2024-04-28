import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DefaultDashboardComponent } from './component/defaultDashboard/default-dashboard.component';
import { NavigationComponent } from './component/navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    pathMatch: 'full',
  },
];
