import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from '../../../lib/api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AssignDialogComponent } from '../dialog/assign-dialog/assign-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    CommonModule,
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
  dataType: string = '';
  complaints: any[] = [];
  dialogComplaints: any[] = [];

  showTicketFirst: boolean = true;
  matchingEngineers: any[] = [];

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
    this.getComplaints();
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
      error: (error) => {
        this.snackBar.open(error.error.message, '', {
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
      this.dataType = 'employee';
    });
  }

  getEngineer(): void {
    this.api.getEngineerList().subscribe((engineer: any) => {
      this.data = engineer;
      this.dataType = 'engineer';
    });
  }

  getAdmin(): void {
    this.api.getAdminList().subscribe((admin: any) => {
      this.data = admin;
      this.dataType = 'admin';
    });
  }

  getComplaints(): void {
    this.api.getComplaintsList().subscribe((complaint: any) => {
      this.complaints = complaint;
    });
  }

  getUnassignedComplaints(): void {
    this.api.getEngineerList().subscribe((engineers: any[]) => {
      this.matchingEngineers = engineers;
    });
    this.api.getUnassignedComplaints().subscribe({
      next: (complaint) => {
        this.dialogComplaints = complaint;
        this.openEngineerSuggestionDialog(complaint);
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
  openEngineerSuggestionDialog(complaint: any): void {
    this.dialog.open(AssignDialogComponent, {
      data: {
        from: 'navigation',
        complaints: this.dialogComplaints,
        engineers: this.matchingEngineers,
      },
      disableClose: true,
    });
  }
}
