import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../../lib/api.service';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { TicketComponent } from '../../component/ticket/ticket.component';
import { DefaultDashboardComponent } from '../../component/defaultDashboard/default-dashboard.component';

@Component({
  selector: 'app-engineer',
  standalone: true,
  templateUrl: './engineer.component.html',
  styleUrl: './engineer.component.scss',
  imports: [
    NavigationComponent,
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    AsyncPipe,
    TicketComponent,
    FormsModule,
    MatMenuModule,
    DefaultDashboardComponent,
  ],
})
export class EngineerComponent implements OnInit {
  loggerName: string = '';
  role: string = '';
  showDefaultDashboard: boolean = true;
  complaints: any[] = [];
  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loggerName =
        (params['loggerFirst'] || '').toUpperCase() +
        ' ' +
        (params['loggerLast'] || '').toUpperCase();
      this.role = params['loggerRole'] || '';
    });
    this.getComplaints();
  }

  logout() {
    this.api.logout().subscribe({
      next: (data) => {
        this.router.navigate([
          '/login',
          { loggerFirst: data.firstName, loggerLast: data.lastName },
        ]);
        this.snackBar.open('Logged out successfully!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }

  getComplaints(): void {
    this.api.getEngineerComplaintsList().subscribe((complaint: any) => {
      this.complaints = complaint;
    });
  }
}
