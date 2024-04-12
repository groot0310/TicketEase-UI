import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ApiService } from '../../../lib/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    DashboardComponent,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    TicketComponent,
  ],
})
export class NavigationComponent implements OnInit {
  loggerName: string = '';
  loggerData: string = '';
  hasLoggedIn: boolean = true;
  data: any[] = [];
  complaints: any[] = [];
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loggerName =
        (params['loggerFirst'] || '').toUpperCase() +
        ' ' +
        (params['loggerLast'] || '').toUpperCase();
    });
  }

  openDialog(formType: string, heading: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { formType, heading },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.snackBar.open('Successfully added ' + result.username + '!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => true),
      shareReplay()
    );

  logout() {
    this.api.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.hasLoggedIn = false;
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
      error: () => {
        this.snackBar.open('Something went wrong...!!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
  getEmployees(): void {
    this.api.getEmployeeList().subscribe((employees: any) => {
      this.data = employees;
    });
  }

  getEngineer(): void {
    this.api.getEngineerList().subscribe((engineer: any) => {
      this.data = engineer;
    });
  }

  getAdmin(): void {
    this.api.getAdminList().subscribe((engineer: any) => {
      this.data = engineer;
    });
  }

  getComplaints(): void {
    this.api.getComplaintsList().subscribe((complaint: any) => {
      this.complaints = complaint;
    });
  }

  getComplaintsWithStatus(ticketStatus: string): void {
    this.api
      .getComplaintsListWithStatus(ticketStatus)
      .subscribe((complaint: any) => {
        this.complaints = complaint;
      });
  }
}
