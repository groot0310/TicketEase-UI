import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { NavigationComponent } from '../../component/navigation/navigation.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NavigationComponent, DashboardComponent, RouterOutlet],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {}
