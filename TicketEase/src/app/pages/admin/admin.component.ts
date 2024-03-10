import { Component } from '@angular/core';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavigationComponent, DashboardComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
